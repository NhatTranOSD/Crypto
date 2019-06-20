using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ShoppingService.Common;
using ShoppingService.Data;
using ShoppingService.Data.Entities;
using ShoppingService.Interfaces;
using ShoppingService.Models.RequestModels;
using ShoppingService.Models.ResponseModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShoppingService.Services
{
    public class OrderService : IOrderService
    {
        private readonly ShoppingContext _shoppingContext;
        private readonly IMapper _mapper;

        public OrderService(ShoppingContext shoppingContext, IMapper mapper)
        {
            _shoppingContext = shoppingContext;
            _mapper = mapper;
        }

        public async Task<IEnumerable<OrderResponseModel>> Orders(Guid userId)
        {
            try
            {
                IEnumerable<Order> orders = await _shoppingContext.Orders.Where(x => x.BuyerId.Equals(userId)).OrderBy(o => o.UpdatedDate).ToListAsync();

                IEnumerable<OrderResponseModel> response = _mapper.Map<IList<OrderResponseModel>>(orders);

                return response;
            }
            catch (Exception ex)
            {
                return null;
                throw ex;
            }
        }

        public async Task<IEnumerable<OrderResponseModel>> Orders()
        {
            try
            {
                IList<Order> orders = await _shoppingContext.Orders.OrderBy(o => o.UpdatedDate).ToListAsync();

                IList<OrderResponseModel> response = _mapper.Map<IList<OrderResponseModel>>(orders);

                return response;
            }
            catch (Exception ex)
            {
                return null;
                throw ex;
            }
        }

        public async Task<OrderResponseModel> CreateOrder(OrderRequestModel requestModel)
        {
            try
            {
                // Check Product Valid and Product Count
                Product product = await _shoppingContext.Products.SingleOrDefaultAsync(x => x.Id == requestModel.ProductId && x.Stock >= requestModel.TotalProducts);

                if (product == null) return null;

                // Caculate totalPayment
                decimal totalPayment = product.Price * requestModel.TotalProducts;

                // Check Buyer Valid and Product Balance


                // Init Order
                Order order = new Order()
                {
                    Id = Guid.NewGuid(),
                    UpdatedDate = DateTime.UtcNow,
                    CreatedDate = DateTime.UtcNow,
                    BuyerId = requestModel.BuyerId,
                    BuyerEmail = requestModel.BuyerEmail,
                    ProductId = requestModel.ProductId,
                    ProductName = requestModel.ProductName,
                    TotalProducts = requestModel.TotalProducts,
                    OrderStatus = OrderStatus.Processing,
                    TotalPayment = totalPayment,
                    TxHash = "TxHash",
                };

                await _shoppingContext.Orders.AddAsync(order);

                // Update Stock
                product.Stock = product.Stock - requestModel.TotalProducts;
                _shoppingContext.Products.Attach(product);
                _shoppingContext.Entry(product).Property(x => x.Stock).IsModified = true;

                // Transfer FCO here

                // Complete Transfer
                await _shoppingContext.SaveChangesAsync();

                return _mapper.Map<OrderResponseModel>(order);
            }
            catch (Exception ex)
            {
                return null;
                throw ex;
            }
        }

        public async Task<bool> RefundOrder(Guid orderId, Guid userId)
        {
            try
            {
                Order order = await _shoppingContext.Orders.SingleOrDefaultAsync(x => x.Id == orderId && x.BuyerId == userId); //  && x.OrderStatus == OrderStatus.Completed

                if (order == null) return false;

                order.OrderStatus = OrderStatus.Refunding;

                _shoppingContext.Orders.Attach(order);
                _shoppingContext.Entry(order).Property(x => x.OrderStatus).IsModified = true;

                await _shoppingContext.SaveChangesAsync();

                return true;

            }
            catch (Exception ex)
            {
                return false;
                throw ex;
            }
        }

        public async Task<bool> AcceptRefundOrder(Guid orderId)
        {
            try
            {
                Order order = await _shoppingContext.Orders.SingleOrDefaultAsync(x => x.Id == orderId && x.OrderStatus == OrderStatus.Refunding); //  && x.OrderStatus == OrderStatus.Completed
                Product product = await _shoppingContext.Products.SingleOrDefaultAsync(x => x.Id == order.ProductId);

                if (order == null || product == null) return false;

                order.OrderStatus = OrderStatus.RefundSuccess;

                _shoppingContext.Orders.Attach(order);
                _shoppingContext.Entry(order).Property(x => x.OrderStatus).IsModified = true;

                product.Stock = product.Stock + order.TotalProducts;

                _shoppingContext.Products.Attach(product);
                _shoppingContext.Entry(product).Property(x => x.Stock).IsModified = true;

                await _shoppingContext.SaveChangesAsync();

                return true;

            }
            catch (Exception ex)
            {
                return false;
                throw ex;
            }
        }

        public async Task<bool> RefuseRefundOrder(Guid orderId)
        {
            try
            {
                Order order = await _shoppingContext.Orders.SingleOrDefaultAsync(x => x.Id == orderId); //  && x.OrderStatus == OrderStatus.Completed

                if (order == null) return false;

                order.OrderStatus = OrderStatus.RefundFailed;

                _shoppingContext.Orders.Attach(order);
                _shoppingContext.Entry(order).Property(x => x.OrderStatus).IsModified = true;

                await _shoppingContext.SaveChangesAsync();

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
