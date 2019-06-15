using AutoMapper;
using ShoppingService.Data.Entities;
using ShoppingService.Models.ResponseModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShoppingService.Common
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Product, ProductResponseModel>();
            CreateMap<Order, OrderResponseModel>();
        }
    }
}
