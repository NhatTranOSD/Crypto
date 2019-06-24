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
using WalletService.Data.Entities;

namespace WalletService.Services
{
    public class WalletService : IWalletService
    {
        private readonly WalletContext _walletContext;
        private readonly IWeb3Service _web3Service;
        private readonly IMapper _mapper;

        private IAccountService _accountService;

        public WalletService(IWeb3Service web3Service, WalletContext walletContext, IAccountService accountService, IMapper mapper)
        {
            _walletContext = walletContext;
            _accountService = accountService;
            _web3Service = web3Service;
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
                    WalletCurrency = walletCurrency,
                    CreatedDate = DateTime.UtcNow,
                };

                await _walletContext.Wallets.AddAsync(wallet);

                Account account = await _web3Service.CreateAccount(wallet.Id);

                if (account == null) return false;

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
                                                .Include(w => w.WalletCurrency)
                                                .Include(a => a.Account)
                                                .Where(x => x.UserId == userId).OrderByDescending(x => x.CreatedDate).ToListAsync();

                IList<WalletResponseModel> responseModel = _mapper.Map<IList<WalletResponseModel>>(responseWallet);

                // Get Balance for per wallet
                foreach (var wallet in responseModel)
                {
                    if (wallet.WalletCurrency.CurrencyType == CurrencyType.FCO)
                    {
                        wallet.WalletCurrency.Balance = await _accountService.TokenBalance(wallet.Account?.Address, "", FCOToken.CONTRACT);
                    }
                    else if (wallet.WalletCurrency.CurrencyType == CurrencyType.ETH)
                    {
                        wallet.WalletCurrency.Balance = await _accountService.ETHBalance(wallet.Account?.Address);
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
