using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WalletService.Models
{
    public class WalletCurrency
    {
        public string Id { get; set; }

        public CurrencyType CurrencyType { get; set; }

        public string WalletId { get; set; }

        public Wallet Wallet { get; set; }
    }

    public enum CurrencyType
    {
        FCO = 0,
        ETH = 1,
    }
}
