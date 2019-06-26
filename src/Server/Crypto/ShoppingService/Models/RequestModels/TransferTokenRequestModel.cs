using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ShoppingService.Models.RequestModels
{
    public class TransferTokenRequestModel
    {
        [Required]
        public Guid UserId { get; set; }

        [Required]
        public decimal Amount { get; set; }
    }
}
