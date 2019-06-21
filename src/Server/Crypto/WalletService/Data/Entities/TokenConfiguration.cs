using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WalletService.Entities
{
    public class TokenConfiguration
    {
        [Required]
        public Guid Id { get; set; }

        [Required]
        public string TokenName { get; set; }

        [Required]
        public string TokenSymbol { get; set; }

        [Required]
        public string ContractAddress { get; set; }

        [Required]
        public string AdminAddress { get; set; }

        [Required]
        public decimal PriceUSD { get; set; }

        [Required]
        public decimal GasLimit { get; set; }

        [Required]
        public double GasPricesInGwei { get; set; }

        [Required]
        public int Decimals { get; set; }
    }
}
