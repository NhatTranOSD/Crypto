using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WalletService.Entities;

namespace WalletService.Data.Entities
{
    public class Account
    {
        public Guid Id { get; set; }

        public string Address { get; set; }

        public string PrivateKey { get; set; }

        public Guid WalletId { get; set; }

        public Wallet Wallet { get; set; }
    }
}
