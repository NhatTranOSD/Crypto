using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WalletService.Data.Entities;
using WalletService.Entities.RequestModels;
using WalletService.Entities.ResponseModels;

namespace WalletService.Interfaces
{
    public interface IWalletService
    {
        Task<bool> CreateWallet(CreateRequestModel requestModel);

        Task<IList<WalletResponseModel>> GetInfoByUserId(string userId);      
    }
}
