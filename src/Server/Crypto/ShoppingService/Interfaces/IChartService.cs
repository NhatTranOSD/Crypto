using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShoppingService.Interfaces
{
    public interface IChartService
    {
        Task<IEnumerable<decimal>> OrderData();
    }
}
