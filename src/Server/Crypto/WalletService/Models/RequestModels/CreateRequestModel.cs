﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WalletService.Entities.RequestModels
{
    public class CreateRequestModel
    {
        public string UserId { get; set; }

        public int CurrencyType { get; set; }
    }
}