using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WalletService.Data.Entities;

namespace WalletService.Models.ResponseModels
{
    public class TokenOrderResponseModel
    {
        public Guid Id { get; set; }

        public string ReceiveTxHash { get; set; }

        public string SendTxHash { get; set; }

        public string RevertTxHash { get; set; }

        public Guid BuyerId { get; set; }

        public string BuyerEmail { get; set; }

        public DateTime CreatedDate { get; set; }

        public decimal Amount { get; set; }

        public decimal Fee { get; set; }

        public decimal TotalPayment { get; set; }

        public TokenOrderStatus TokenOrderStatus { get; set; }

        public PairType PairType { get; set; }
    }
}
