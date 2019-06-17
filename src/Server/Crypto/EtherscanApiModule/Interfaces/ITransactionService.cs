using EtherscanApiModule.Models.ResponseModels;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace EtherscanApiModule.Interfaces
{
    public interface ITransactionService
    {
        Task<ResponseModel> GetEtherPrice();

        Task<ResponseModel> GetStatus(string txhash);

        Task<ResponseModel> GetTokenSupply(string tokenname, string contractaddress);
    }
}
