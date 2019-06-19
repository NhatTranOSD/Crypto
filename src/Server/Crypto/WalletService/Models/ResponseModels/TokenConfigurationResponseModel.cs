using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WalletService.Models.ResponseModels
{
    public class TokenConfigurationResponseModel
    {
        public Guid Id { get; set; }

        public string TokenName { get; set; }

        public string TokenSymbol { get; set; }

        public string ContractAddress { get; set; }

        public string AdminAddress { get; set; }

        public decimal PriceUSD { get; set; }

        public int Decimals { get; set; }
    }
}
