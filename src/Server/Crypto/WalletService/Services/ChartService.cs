using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WalletService.Data;

namespace WalletService.Services
{
    public class ChartService
    {
        private readonly WalletContext _walletContext;
        private readonly IMapper _mapper;

        public ChartService(WalletContext walletContext, IMapper mapper)
        {
            _walletContext = walletContext;
            _mapper = mapper;
        }

        public async Task<IEnumerable<int>> OrderData()
        {
            try
            {

                DbFunctions dfunc = null;

                int order_0 = await _walletContext.TokenOrders.CountAsync(x => SqlServerDbFunctionsExtensions.DateDiffDay(dfunc, x.CreatedDate, DateTime.UtcNow) == 0);
                int order_1 = await _walletContext.TokenOrders.CountAsync(x => SqlServerDbFunctionsExtensions.DateDiffDay(dfunc, x.CreatedDate, DateTime.UtcNow) == 1);
                int order_2 = await _walletContext.TokenOrders.CountAsync(x => SqlServerDbFunctionsExtensions.DateDiffDay(dfunc, x.CreatedDate, DateTime.UtcNow) == 2);
                int order_3 = await _walletContext.TokenOrders.CountAsync(x => SqlServerDbFunctionsExtensions.DateDiffDay(dfunc, x.CreatedDate, DateTime.UtcNow) == 3);
                int order_4 = await _walletContext.TokenOrders.CountAsync(x => SqlServerDbFunctionsExtensions.DateDiffDay(dfunc, x.CreatedDate, DateTime.UtcNow) == 4);
                int order_5 = await _walletContext.TokenOrders.CountAsync(x => SqlServerDbFunctionsExtensions.DateDiffDay(dfunc, x.CreatedDate, DateTime.UtcNow) == 5);
                int order_6 = await _walletContext.TokenOrders.CountAsync(x => SqlServerDbFunctionsExtensions.DateDiffDay(dfunc, x.CreatedDate, DateTime.UtcNow) == 6);

                IEnumerable<int> data = new List<int>()
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

        public async Task<IEnumerable<decimal>> TotalOrderData()
        {
            try
            {

                DbFunctions dfunc = null;

                decimal order_0 = await _walletContext.TokenOrders.Where(x => SqlServerDbFunctionsExtensions.DateDiffDay(dfunc, x.CreatedDate, DateTime.UtcNow) == 0).SumAsync(s => s.TotalPayment);
                decimal order_1 = await _walletContext.TokenOrders.Where(x => SqlServerDbFunctionsExtensions.DateDiffDay(dfunc, x.CreatedDate, DateTime.UtcNow) == 1).SumAsync(s => s.TotalPayment);
                decimal order_2 = await _walletContext.TokenOrders.Where(x => SqlServerDbFunctionsExtensions.DateDiffDay(dfunc, x.CreatedDate, DateTime.UtcNow) == 2).SumAsync(s => s.TotalPayment);
                decimal order_3 = await _walletContext.TokenOrders.Where(x => SqlServerDbFunctionsExtensions.DateDiffDay(dfunc, x.CreatedDate, DateTime.UtcNow) == 3).SumAsync(s => s.TotalPayment);
                decimal order_4 = await _walletContext.TokenOrders.Where(x => SqlServerDbFunctionsExtensions.DateDiffDay(dfunc, x.CreatedDate, DateTime.UtcNow) == 4).SumAsync(s => s.TotalPayment);
                decimal order_5 = await _walletContext.TokenOrders.Where(x => SqlServerDbFunctionsExtensions.DateDiffDay(dfunc, x.CreatedDate, DateTime.UtcNow) == 5).SumAsync(s => s.TotalPayment);
                decimal order_6 = await _walletContext.TokenOrders.Where(x => SqlServerDbFunctionsExtensions.DateDiffDay(dfunc, x.CreatedDate, DateTime.UtcNow) == 6).SumAsync(s => s.TotalPayment);


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
