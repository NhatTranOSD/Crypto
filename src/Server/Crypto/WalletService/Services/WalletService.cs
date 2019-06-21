using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WalletService.Data;
using WalletService.Interfaces;
using WalletService.Entities;
using WalletService.Entities.RequestModels;
using WalletService.Entities.ResponseModels;
using EtherscanApiModule.Interfaces;
using EtherscanApiModule.Common;

namespace WalletService.Services
{
    public class WalletService : IWalletService
    {
        private readonly WalletContext _walletContext;
        private readonly IMapper _mapper;

        private IAccountService _accountService;

        public WalletService(WalletContext walletContext, IAccountService accountService, IMapper mapper)
        {
            _walletContext = walletContext;
            _accountService = accountService;
            _mapper = mapper;
        }

        public async Task<bool> CreateWallet(CreateRequestModel requestModel)
        {
            try
            {
                // Init ETH currency (Default)
                WalletCurrency walletCurrency = new WalletCurrency()
                {
                    Balance = "0",
                    CurrencyType = (CurrencyType)requestModel.CurrencyType,
                    Id = Guid.NewGuid(),
                    UpdatedDate = DateTime.UtcNow,
                };

                await _walletContext.WalletCurrencys.AddAsync(walletCurrency);

                // Init wallet, will generate here
                Wallet wallet = new Wallet()
                {
                    Id = Guid.NewGuid(),
                    UserId = requestModel.UserId,
                    WalletCurrencys = new List<WalletCurrency>() { walletCurrency }
                };

                await _walletContext.Wallets.AddAsync(wallet);

                await _walletContext.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                return false;
                throw ex;
            }
        }

        public async Task<IList<WalletResponseModel>> GetInfoByUserId(string userId)
        {
            try
            {
                IList<Wallet> responseWallet = await _walletContext.Wallets
                                                .Include(w => w.WalletCurrencys)
                                                .Where(x => x.UserId == userId).OrderByDescending(x => x.CreatedDate).ToListAsync();

                IList<WalletResponseModel> responseModel = _mapper.Map<IList<WalletResponseModel>>(responseWallet);

                // Get Balance for per wallet
                foreach (var wallet in responseModel)
                {
                    foreach (var currency in wallet.WalletCurrencys)
                    {
                        if (currency.CurrencyType == CurrencyType.FCO)
                        {
                            currency.Balance = await _accountService.TokenBalance(wallet.Address, "", FCOToken.CONTRACT);
                        }
                        else if (currency.CurrencyType == CurrencyType.ETH)
                        {
                            currency.Balance = await _accountService.ETHBalance(wallet.Address);
                        }
                    }
                }

                return responseModel;
            }
            catch (Exception ex)
            {
                return null;
                throw ex;
            }
        }
    }
}
