using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WalletService.Models.RequestModels;
using WalletService.Models.ResponseModels;

namespace WalletService.Interfaces
{
    public interface IWalletService
    {
        Task<bool> CreateWallet(CreateRequestModel requestModel);

        Task<IList<WalletResponseModel>> GetInfoByUserId(string userId);
    }
}
