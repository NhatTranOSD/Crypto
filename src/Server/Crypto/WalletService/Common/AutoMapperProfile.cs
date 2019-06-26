using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WalletService.Data;
using WalletService.Data.Entities;
using WalletService.Entities;
using WalletService.Entities.ResponseModels;
using WalletService.Models.ResponseModels;

namespace WalletService.Common
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Wallet, WalletResponseModel>();
            CreateMap<Account, AccountResponseModel>();
            CreateMap<WalletCurrency, WalletCurrencyResponseModel>();
            CreateMap<TokenConfiguration, TokenConfigurationResponseModel>();
            CreateMap<TokenOrder, TokenOrderResponseModel>();
        }
    }
}
