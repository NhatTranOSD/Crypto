using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using WalletService.Data.Entities;

namespace WalletService.Entities
{
    public class Wallet
    {
        public Guid Id { get; set; }

        public string UserId { get; set; }

        public Account Account { get; set; }

        //public string PrivateKey { get; set; }

        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:MM/dd/yyyy }")]
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;

        public WalletCurrency WalletCurrency { get; set; }
    }
}
