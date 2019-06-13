using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WalletService.Data;
using WalletService.Interfaces;
using WalletService.Models;
using WalletService.Models.RequestModels;
using WalletService.Models.ResponseModels;

namespace WalletService.Services
{
    public class WalletService : IWalletService
    {
        private readonly WalletContext _walletContext;
        private readonly IMapper _mapper;

        public WalletService(WalletContext walletContext, IMapper mapper)
        {
            _walletContext = walletContext;
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

                // Init wallet
                Wallet wallet = new Wallet()
                {
                    Address = "Api Will Generate",
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
                                                .Where(x => x.UserId == userId).ToListAsync();

                IList<WalletResponseModel> responseModel = _mapper.Map<IList<WalletResponseModel>>(responseWallet);

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
