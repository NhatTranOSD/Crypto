using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using WalletService.Models.ResponseModels;

namespace WalletService.Entities.ResponseModels
{
    public class WalletResponseModel
    {
        public Guid Id { get; set; }

        public string UserId { get; set; }

        public AccountResponseModel Account { get; set; }

        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:MM/dd/yyyy }")]
        public DateTime CreatedDate { get; set; }

        public WalletCurrencyResponseModel WalletCurrency { get; set; }
    }
}
