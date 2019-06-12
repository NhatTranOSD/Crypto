using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WalletService.Models
{
    public class Wallet
    {
        public Guid Id { get; set; }

        public string UserId { get; set; }

        public string Address { get; set; }

        //public string PrivateKey { get; set; }

        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:MM/dd/yyyy }")]
        public DateTime CreatedDate { get; } = DateTime.UtcNow;

        public ICollection<WalletCurrency> WalletCurrencys { get; set; }
    }
}
