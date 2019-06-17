using ShoppingService.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShoppingService.Models.ResponseModels
{
    public class OrderResponseModel
    {
        public Guid Id { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime UpdatedDate { get; set; }

        public Guid BuyerId { get; set; }

        public string BuyerEmail { get; set; }

        public Guid ProductId { get; set; }

        public string ProductName { get; set; }

        public int TotalProducts { get; set; }

        public decimal TotalPayment { get; set; }

        public string Currency { get; set; } = "FCO";

        public OrderStatus OrderStatus { get; set; }
    }
}
