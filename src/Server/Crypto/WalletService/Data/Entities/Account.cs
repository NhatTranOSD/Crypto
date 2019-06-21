using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WalletService.Data.Entities
{
    public class Account
    {
        public Guid Id { get; set; }

        public string Address { get; set; }

        public string PrivateKey { get; set; }
    }
}
