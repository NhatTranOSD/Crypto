using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WalletService.Models.ResponseModels
{
    public class AccountResponseModel
    {
        public string Address { get; set; }
        
        public string PrivateKey { get; set; }
    }
}
