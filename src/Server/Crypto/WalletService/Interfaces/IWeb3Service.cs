using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WalletService.Data.Entities;

namespace WalletService.Interfaces
{
    public interface IWeb3Service
    {
        Task<Account> CreateAccount(Guid walletId);
        Task<string> SendETH(string to, decimal value);
        Task<string> SendToken(string to, decimal value);
    }
}
