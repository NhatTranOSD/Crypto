﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WalletService.Models.ResponseModels
{
    public class WalletResponseModel
    {
        public Guid Id { get; set; }

        public string UserId { get; set; }

        public string Address { get; set; }

        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:MM/dd/yyyy }")]
        public DateTime CreatedDate { get; set; }

        public IList<WalletCurrencyResponseModel> WalletCurrencys { get; set; }
    }
}
