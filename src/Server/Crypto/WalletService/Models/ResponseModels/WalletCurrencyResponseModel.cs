using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WalletService.Entities.ResponseModels
{
    public class WalletCurrencyResponseModel
    {
        public Guid Id { get; set; }

        public CurrencyType CurrencyType { get; set; }

        public string Balance { get; set; }

        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:MM/dd/yyyy }")]
        public DateTime UpdatedDate { get; set; }
    }
}
