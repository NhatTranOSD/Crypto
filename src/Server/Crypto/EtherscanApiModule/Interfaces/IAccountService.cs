using EtherscanApiModule.Models.ResponseModels;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace EtherscanApiModule.Interfaces
{
    public interface IAccountService
    {
        Task<string> ETHBalance(string address);

        Task<string> TokenBalance(string address, string tokenname, string contractaddress);

        Task<ResponseModel> TokenTxList(string address, string contractaddress, string startblock, string endblock, string sort);

        Task<ResponseModel> ETHTxList(string address, string startblock, string endblock, int page, int offset, string sort);

        Task<ResponseModel> ETHTxListInternal(string txhash, string address = null, string startblock = null, string endblock = null, string sort = null);


    }
}
