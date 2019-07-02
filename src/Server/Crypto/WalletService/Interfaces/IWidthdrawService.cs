using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WalletService.Data.Entities;
using WalletService.Models.RequestModels;
using WalletService.Models.ResponseModels;

namespace WalletService.Interfaces
{
    public interface IWidthdrawService
    {
        Task<bool> Widthdraw(Guid userId, decimal amount, string address, PairType pair);
    }
}
