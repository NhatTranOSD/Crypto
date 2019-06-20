using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WalletService.Data;
using WalletService.Entities;
using WalletService.Interfaces;
using WalletService.Models.RequestModels;
using WalletService.Models.ResponseModels;

namespace WalletService.Services
{
    public class TokenService : ITokenService
    {
        private readonly WalletContext _walletContext;
        private readonly IMapper _mapper;

        public TokenService(WalletContext walletContext, IMapper mapper)
        {
            _walletContext = walletContext;
            _mapper = mapper;
        }

        public async Task<TokenConfigurationResponseModel> GetTokenInfo()
        {
            try
            {
                TokenConfiguration tokenConfiguration = await _walletContext.TokenConfiguration.SingleOrDefaultAsync();

                return _mapper.Map<TokenConfigurationResponseModel>(tokenConfiguration);
            }
            catch (Exception ex)
            {
                return null;
                throw ex;
            }
        }

        public async Task<bool> UpdateTokenInfo(TokenConfigurationRequestModel requestModel)
        {
            try
            {
                TokenConfiguration tokenConfiguration = await _walletContext.TokenConfiguration.SingleOrDefaultAsync(x => x.Id == requestModel.Id);

                if (tokenConfiguration == null) return false;

                tokenConfiguration.PriceUSD = requestModel.PriceUSD;
                tokenConfiguration.AdminAddress = requestModel.AdminAddress;
                tokenConfiguration.ContractAddress = requestModel.ContractAddress;
                tokenConfiguration.Decimals = requestModel.Decimals;
                tokenConfiguration.PriceUSD = requestModel.PriceUSD;
                tokenConfiguration.TokenName = requestModel.TokenName;
                tokenConfiguration.TokenSymbol = requestModel.TokenSymbol;

                _walletContext.TokenConfiguration.Update(tokenConfiguration);

                await _walletContext.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                return false;
                throw ex;
            }
        }
    }
}
