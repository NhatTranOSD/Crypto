using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace EtherscanApiModule.Interfaces
{
    public interface IAccountService
    {
        Task<string> Balance(string address);
        Task<string> TokenBalance(string address, string tokenname, string contractaddress);
    }
}
