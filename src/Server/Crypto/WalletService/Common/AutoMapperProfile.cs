using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WalletService.Entities;
using WalletService.Entities.ResponseModels;

namespace WalletService.Common
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Wallet, WalletResponseModel>();
            CreateMap<List<Wallet>, List<WalletResponseModel>>();
            CreateMap<WalletCurrency, WalletCurrencyResponseModel>();
        }
    }
}
