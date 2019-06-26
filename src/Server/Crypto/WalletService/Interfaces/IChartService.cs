using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WalletService.Interfaces
{
    public interface IChartService
    {
        Task<IEnumerable<decimal>> TotalOrderData();
    }
}
