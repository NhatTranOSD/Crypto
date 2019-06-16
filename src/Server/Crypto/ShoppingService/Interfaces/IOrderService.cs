﻿using ShoppingService.Models.RequestModels;
using ShoppingService.Models.ResponseModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShoppingService.Interfaces
{
    public interface IOrderService
    {
        Task<IEnumerable<OrderResponseModel>> Orders();

        Task<IEnumerable<OrderResponseModel>> Orders(Guid userId);

        Task<OrderResponseModel> CreateOrder(OrderRequestModel requestModel);
    }
}