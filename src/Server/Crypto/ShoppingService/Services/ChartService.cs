using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ShoppingService.Data;
using ShoppingService.Data.Entities;
using ShoppingService.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShoppingService.Services
{
    public class ChartService : IChartService
    {
        private readonly ShoppingContext _shoppingContext;
        private readonly IMapper _mapper;

        public ChartService(ShoppingContext shoppingContext, IMapper mapper)
        {
            _shoppingContext = shoppingContext;
            _mapper = mapper;
        }

        public async Task<IEnumerable<decimal>> OrderData()
        {
            try
            {

                DbFunctions dfunc = null;

                decimal order_0 = await _shoppingContext.Orders.Where(x => SqlServerDbFunctionsExtensions.DateDiffDay(dfunc, x.CreatedDate, DateTime.UtcNow) == 0).SumAsync(s => s.TotalPayment);
                decimal order_1 = await _shoppingContext.Orders.Where(x => SqlServerDbFunctionsExtensions.DateDiffDay(dfunc, x.CreatedDate, DateTime.UtcNow) == 1).SumAsync(s => s.TotalPayment);
                decimal order_2 = await _shoppingContext.Orders.Where(x => SqlServerDbFunctionsExtensions.DateDiffDay(dfunc, x.CreatedDate, DateTime.UtcNow) == 2).SumAsync(s => s.TotalPayment);
                decimal order_3 = await _shoppingContext.Orders.Where(x => SqlServerDbFunctionsExtensions.DateDiffDay(dfunc, x.CreatedDate, DateTime.UtcNow) == 3).SumAsync(s => s.TotalPayment);
                decimal order_4 = await _shoppingContext.Orders.Where(x => SqlServerDbFunctionsExtensions.DateDiffDay(dfunc, x.CreatedDate, DateTime.UtcNow) == 4).SumAsync(s => s.TotalPayment);
                decimal order_5 = await _shoppingContext.Orders.Where(x => SqlServerDbFunctionsExtensions.DateDiffDay(dfunc, x.CreatedDate, DateTime.UtcNow) == 5).SumAsync(s => s.TotalPayment);
                decimal order_6 = await _shoppingContext.Orders.Where(x => SqlServerDbFunctionsExtensions.DateDiffDay(dfunc, x.CreatedDate, DateTime.UtcNow) == 6).SumAsync(s => s.TotalPayment);

                IEnumerable<decimal> data = new List<decimal>()
                        {
                            order_6, order_5, order_4, order_3, order_2, order_1, order_0
                        };

                return data;
            }
            catch (Exception ex)
            {
                return null;
                throw ex;
            }
        }
    }
}
