using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WalletService.Data;
using WalletService.Interfaces;

namespace WalletService.Services
{
    public class ChartService : IChartService
    {
        private readonly WalletContext _walletContext;
        private readonly IMapper _mapper;

        public ChartService(WalletContext walletContext, IMapper mapper)
        {
            _walletContext = walletContext;
            _mapper = mapper;
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
                            order_6/1000000000, order_5/1000000000, order_4/1000000000, order_3/1000000000, order_2/1000000000, order_1/1000000000, order_0/1000000000
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
