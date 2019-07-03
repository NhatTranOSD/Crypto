using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WalletService.Data.Entities;
using WalletService.Models.RequestModels;
using WalletService.Models.ResponseModels;

namespace WalletService.Interfaces
{
    public interface ITokenService
    {
        Task<TokenConfigurationResponseModel> GetTokenInfo();

        Task<bool> UpdateTokenInfo(TokenConfigurationRequestModel requestModel);

        Task<bool> BuyToken(Guid userId, decimal amount, PairType pair);

        Task<string> TransferTokenToAdmin(Guid userId, decimal amount);

        Task<string> RefundUserToken(Guid userId, decimal amount);

        Task<IEnumerable<TokenOrderResponseModel>> TokenOrderHistory(Guid userId);

        Task<IEnumerable<TokenOrderResponseModel>> TokenOrderHistory();
    }
}
