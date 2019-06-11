using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WalletService.Models
{
    public class Wallet
    {
        public string Id { get; set; }

        public string UserId { get; set; }

        public string Address { get; set; }

        public string PrivateKey { get; set; }

        public DateTime CreatedDate { get; set; }

        public ICollection<WalletCurrency> WalletCurrencys { get; set; }
    }
}
