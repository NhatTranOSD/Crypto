using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace EtherscanApiModule.Interfaces
{
    public interface ITransactionService
    {
        Task<int> GetEtherPrice();
    }
}
