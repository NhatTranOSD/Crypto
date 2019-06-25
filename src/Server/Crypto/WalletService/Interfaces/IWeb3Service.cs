using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WalletService.Data.Entities;

namespace WalletService.Interfaces
{
    public interface IWeb3Service
    {
        Task<Account> CreateAccount();
        Task<string> SendETH(string from, string to, decimal value, string privateKey);
        Task<string> SendToken(string from, string to, decimal value, string privateKey);
    }
}
