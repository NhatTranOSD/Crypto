using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using ShoppingService.Common;
using ShoppingService.Data;
using ShoppingService.Data.Entities;
using ShoppingService.Interfaces;
using ShoppingService.Models.RequestModels;
using ShoppingService.Models.ResponseModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace ShoppingService.Services
{
    public class OrderService : IOrderService
    {
        private readonly ShoppingContext _shoppingContext;
        private readonly IMapper _mapper;
        private readonly HttpClient _httpClient;

        public OrderService(ShoppingContext shoppingContext, IMapper mapper, HttpClient httpClient)
        {
            _shoppingContext = shoppingContext;
            _mapper = mapper;
            _httpClient = httpClient;
        }

        public async Task<IEnumerable<OrderResponseModel>> Orders(Guid userId)
        {
            try
            {
                IEnumerable<Order> orders = await _shoppingContext.Orders.Where(x => x.BuyerId.Equals(userId)).OrderByDescending(o => o.CreatedDate).Take(20).ToListAsync();

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
                IList<Order> orders = await _shoppingContext.Orders.OrderByDescending(o => o.CreatedDate).Take(20).ToListAsync();

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

                // Check TxHash before

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
                    RefundAmount = requestModel.RefundAmount,
                    OrderStatus = OrderStatus.Completed,
                    TotalPayment = totalPayment,
                    TxHash = requestModel.TxHash,
                };

                await _shoppingContext.Orders.AddAsync(order);

                // Update Stock
                product.Stock = product.Stock - requestModel.TotalProducts;
                _shoppingContext.Products.Attach(product);
                _shoppingContext.Entry(product).Property(x => x.Stock).IsModified = true;


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

        public async Task<bool> RefundOrder(Guid orderId, Guid userId, int amount)
        {
            try
            {
                Order order = await _shoppingContext.Orders.SingleOrDefaultAsync(x => x.Id == orderId && x.BuyerId == userId); //  && x.OrderStatus == OrderStatus.Completed
                if (order == null) return false;
                // Create Order Refund
                // Caculate totalPayment
                //decimal totalPayment = (order.TotalPayment / order.TotalProducts)*amount;

                // Check TxHash before

                // Init Order
                //Order orderRefund = new Order()
                //{
                //    Id = Guid.NewGuid(),
                //    UpdatedDate = DateTime.UtcNow,
                //    CreatedDate = DateTime.UtcNow,
                //    BuyerId = order.BuyerId,
                //    BuyerEmail = order.BuyerEmail,
                //    ProductId = order.ProductId,
                //    ProductName = order.ProductName,
                //    TotalProducts = amount,
                //    OrderStatus = OrderStatus.Refunding,
                //    TotalPayment = totalPayment,
                //    TxHash = order.TxHash,
                //};

                //await _shoppingContext.Orders.AddAsync(orderRefund);
                //await _shoppingContext.SaveChangesAsync();

                order.OrderStatus = OrderStatus.Refunding;
                //order.TotalPayment = order.TotalPayment - amount * (order.TotalPayment / order.TotalProducts);
                //order.TotalProducts = order.TotalProducts - amount;
                order.RefundAmount = amount;

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

                product.Stock = product.Stock + order.RefundAmount;

                _shoppingContext.Products.Attach(product);
                _shoppingContext.Entry(product).Property(x => x.Stock).IsModified = true;

                order.TotalPayment = order.TotalPayment - order.RefundAmount * (order.TotalPayment / order.TotalProducts);
                order.TotalProducts = order.TotalProducts - order.RefundAmount;


                // Refund Coin here

                string refundTxHash = await RefundUserToken(order.BuyerId, order.TotalPayment);

                if (refundTxHash == null)
                {
                    return false;
                }
                else
                {
                    order.RefundTxHash = refundTxHash;
                    order.OrderStatus = OrderStatus.RefundSuccess;

                    _shoppingContext.Orders.Update(order);
                }

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

                //Order orderMain = await _shoppingContext.Orders.SingleOrDefaultAsync(x => x.TxHash == order.TxHash && x.OrderStatus == OrderStatus.Completed); //  && x.OrderStatus == OrderStatus.Completed
                //if (orderMain == null) return false;
                //orderMain.TotalProducts = orderMain.TotalProducts + order.TotalProducts;
                //orderMain.TotalPayment = orderMain.TotalPayment + order.TotalPayment;

                //_shoppingContext.Orders.Attach(orderMain);
                //_shoppingContext.Entry(orderMain).Property(x => x.OrderStatus).IsModified = true;

                await _shoppingContext.SaveChangesAsync();

                return true;

            }
            catch (Exception ex)
            {
                return false;
                throw ex;
            }
        }

        private async Task<string> RefundUserToken(Guid userId, decimal amount)
        {
            try
            {
                //string uri = "https://localhost:5002/api/v1/Token/RefundUserToken";
                string uri = "https://crypto-walletservice.azurewebsites.net/api/v1/Token/RefundUserToken";

                TransferTokenRequestModel requestModel = new TransferTokenRequestModel() { UserId = userId, Amount = amount };

                var jsonRequestModel = JsonConvert.SerializeObject(requestModel);

                HttpResponseMessage response = await _httpClient.PostAsync(uri, new StringContent(jsonRequestModel, Encoding.UTF8, "application/json"));

                var result = JsonConvert.DeserializeObject<TransferTokenResponseModel>(await response.Content.ReadAsStringAsync());

                return result.TxHash;
            }
            catch (Exception ex)
            {
                return null;
                throw ex;
            }
        }
    }
}
