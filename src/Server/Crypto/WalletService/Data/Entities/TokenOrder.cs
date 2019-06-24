using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WalletService.Data.Entities
{
    public class TokenOrder
    {
        [Required]
        public Guid Id { get; set; }

        [Required]
        public string TxHash { get; set; }

        [Required]
        public DateTime CreatedDate { get; set; }

        [Required]
        public Guid BuyerId { get; set; }

        [Required]
        public decimal Amount { get; set; }

        [Required]
        public decimal Fee { get; set; }

        [Required]
        public decimal TotalPayment { get; set; }

        [Required]
        public string TokenName { get; set; }

        [Required]
        public TokenOrderStatus TokenOrderStatus { get; set; }
    }


    public enum TokenOrderStatus
    {
        Failed = 0,
        Successed = 1
    }
}
