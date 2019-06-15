using ShoppingService.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ShoppingService.Models.RequestModels
{
    public class OrderRequestModel
    {
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
    }
}
