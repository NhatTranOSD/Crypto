using AutoMapper;
using EtherscanApiModule.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WalletService.Data;
using WalletService.Data.Entities;
using WalletService.Entities;
using WalletService.Interfaces;
using WalletService.Models.RequestModels;
using WalletService.Models.ResponseModels;

namespace WalletService.Services
{
    public class WidthrdawService : IWidthdrawService
    {
        private readonly WalletContext _walletContext;
        private readonly IMapper _mapper;
        private readonly IAccountService _accountService;
        private readonly IWeb3Service _web3Service;

        public WidthrdawService(WalletContext walletContext, IMapper mapper, IAccountService accountService, IWeb3Service web3Service)
        {
            _walletContext = walletContext;
            _mapper = mapper;
            _accountService = accountService;
            _web3Service = web3Service;
        }


        public async Task<bool> BuyToken(Guid userId, decimal amount, PairType pair)
        {
            try
            {
                TokenConfiguration config = await _walletContext.TokenConfiguration.SingleOrDefaultAsync();

                // get wallets
                IEnumerable<Wallet> wallets = _walletContext.Wallets
                                                .Include(i => i.WalletCurrency)
                                                .Include(i => i.Account)
                                                .Where(x => x.UserId == userId.ToString());

                Wallet ETH = wallets.SingleOrDefault(e => e.WalletCurrency.CurrencyType == CurrencyType.ETH);
                Wallet FCO = wallets.SingleOrDefault(e => e.WalletCurrency.CurrencyType == CurrencyType.FCO);

                if (wallets.Count() < 2) return false;

                TokenOrder tokenOrder = new TokenOrder()
                {
                    Id = Guid.NewGuid(),
                    Amount = amount,
                    BuyerId = userId,
                    CreatedDate = DateTime.UtcNow,
                    Fee = 210000 * 10000000000 + 21000 * 10000000000,
                    TokenName = "FCoin",
                    TotalPayment = (amount / 20 * 1000000000000000000 + 250000 * 10000000000 + 23000 * 10000000000) / 1000000000,
                };

                ETH.WalletCurrency.Balance = await _accountService.ETHBalance(ETH.Account?.Address);

                if (Convert.ToDecimal(ETH.WalletCurrency.Balance) < tokenOrder.TotalPayment * 1000000000) return false;

                // Check type
                if (pair == PairType.ETH_FCO)
                {
                    // Transfer ETH to Admin
                    string receivedTx = await SendETH(ETH.Account.Address, config.AdminAddress, Convert.ToUInt64(tokenOrder.TotalPayment * 1000000000), ETH.Account.PrivateKey);


                    if (string.IsNullOrEmpty(receivedTx))
                    {
                        tokenOrder.TokenOrderStatus = TokenOrderStatus.Failed;
                    }
                    else
                    {
                        // Transfer Token to user
                        string sendTx = await SendToken(config.AdminAddress, FCO.Account.Address, Convert.ToUInt64(amount) * 1000000000000000000, config.PrivateKey);

                        if (string.IsNullOrEmpty(sendTx))
                        {
                            // Revert ETH
                            string revertTx = await SendETH(config.AdminAddress, ETH.Account.Address, Convert.ToUInt64(tokenOrder.TotalPayment * 1000000000), config.PrivateKey);

                            if (string.IsNullOrEmpty(revertTx))
                            {
                                tokenOrder.TokenOrderStatus = TokenOrderStatus.Reverting;
                            }
                            else
                            {
                                tokenOrder.TokenOrderStatus = TokenOrderStatus.Reverted;
                                tokenOrder.RevertTxHash = revertTx;
                            }
                        }
                        else
                        {
                            tokenOrder.TokenOrderStatus = TokenOrderStatus.Successed;
                            tokenOrder.ReceiveTxHash = receivedTx;
                            tokenOrder.SendTxHash = sendTx;
                        }
                    }

                    await _walletContext.TokenOrders.AddAsync(tokenOrder);
                    await _walletContext.SaveChangesAsync();
                }

                return true;
            }
            catch (Exception ex)
            {
                return false;
                throw ex;
            }
        }

        public async Task<bool> Widthdraw(Guid userId, decimal amount,string address, PairType pair)
        {
            try
            {
                TokenConfiguration config = await _walletContext.TokenConfiguration.SingleOrDefaultAsync();

                // get wallets
                IEnumerable<Wallet> wallets = _walletContext.Wallets
                                                .Include(i => i.WalletCurrency)
                                                .Include(i => i.Account)
                                                .Where(x => x.UserId == userId.ToString());

                Wallet ETH = wallets.SingleOrDefault(e => e.WalletCurrency.CurrencyType == CurrencyType.ETH);
                Wallet FCO = wallets.SingleOrDefault(e => e.WalletCurrency.CurrencyType == CurrencyType.FCO);

                if (wallets.Count() < 2) return false;
                // Total Payment
                decimal TotalPayment = (amount * 1000000000000000000 + 250000 * 10000000000 + 23000 * 10000000000) / 1000000000;

                //TokenOrder tokenOrder = new TokenOrder()
                //{
                //    Id = Guid.NewGuid(),
                //    Amount = amount,
                //    BuyerId = userId,
                //    CreatedDate = DateTime.UtcNow,
                //    Fee = 210000 * 10000000000 + 21000 * 10000000000,
                //    TokenName = pair.ToString(),
                //    TotalPayment = (amount * 1000000000000000000) / 1000000000,
                //};

                ETH.WalletCurrency.Balance = await _accountService.ETHBalance(ETH.Account?.Address);

                if (Convert.ToDecimal(ETH.WalletCurrency.Balance) < TotalPayment * 1000000000) return false;

                // Check type
                if (pair == PairType.ETH_ETH)
                {
                    // Transfer ETH to Another User
                    string receivedTx = await SendETH(ETH.Account.Address, address , Convert.ToUInt64(TotalPayment * 1000000000), ETH.Account.PrivateKey);
                    // Transfer FCO to Another User
                 
                }
                if (pair == PairType.FCO_FCO)
                {
                    string sendTx = await SendToken(FCO.Account.Address, address , Convert.ToUInt64(amount) * 1000000000000000000, FCO.Account.PrivateKey);
           
                }
                    return true;
            }
            catch (Exception ex)
            {
                return false;
                throw ex;
            }
        }


        private async Task<string> SendETH(string from, string to, UInt64 value, string privateKey)
        {
            return await _web3Service.SendETH(from, to, value, privateKey);
        }

        private async Task<string> SendToken(string from, string to, UInt64 value, string privateKey)
        {
            return await _web3Service.SendToken(from, to, value, privateKey);
        }
    }
}
