using ShoppingService.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ShoppingService.Data.Entities
{
    public class Order
    {
        [Required]
        public Guid Id { get; set; }

        [Required]
        public DateTime CreatedDate { get; set; }

        [Required]
        public DateTime UpdatedDate { get; set; }

        [Required]
        public Guid BuyerId { get; set; }

        [Required]
        public string BuyerEmail { get; set; }

        [Required]
        public Guid ProductId { get; set; }

        [Required]
        public string ProductName { get; set; }

        [Required]
        public int TotalProducts { get; set; }

        [Required]
        public decimal TotalPayment { get; set; }

        [Required]
        public string Currency { get; set; } = "FCO";

        [Required]
        public string TxHash { get; set; }

        [Required]
        public OrderStatus OrderStatus { get; set; }
    }
}
