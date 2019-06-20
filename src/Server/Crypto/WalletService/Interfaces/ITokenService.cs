﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WalletService.Models.RequestModels;
using WalletService.Models.ResponseModels;

namespace WalletService.Interfaces
{
    public interface ITokenService
    {
        Task<TokenConfigurationResponseModel> GetTokenInfo();

        Task<bool> UpdateTokenInfo(TokenConfigurationRequestModel requestModel);
    }
}