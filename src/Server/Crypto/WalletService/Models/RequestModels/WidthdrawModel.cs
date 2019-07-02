using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using WalletService.Data.Entities;

namespace WalletService.Models.RequestModels
{
    public class WidthdrawModel
    {
        [Required]
        public Guid UserId { get; set; }

        [Required]
        public decimal Amount { get; set; }

        [Required]
        public string Address { get; set; }

        [Required]
        public PairType Pair { get; set; }
    }
}
