using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShoppingService.Common
{
    public enum OrderStatus
    {
        None = 0,
        Processing = 1,
        Completed = 2,
        Refunding = 3,
        RefundFailed = 4,
        RefundSuccess = 5,
    }
}
