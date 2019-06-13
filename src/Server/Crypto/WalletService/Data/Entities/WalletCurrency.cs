using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WalletService.Entities
{
    public class WalletCurrency
    {
        public Guid Id { get; set; }

        public CurrencyType CurrencyType { get; set; }

        public string Balance { get; set; }

        public DateTime UpdatedDate { get; set; }

        public Guid WalletId { get; set; }

        public Wallet Wallet { get; set; }
    }

    public enum CurrencyType
    {
        FCO = 0,
        ETH = 1,
    }
}
