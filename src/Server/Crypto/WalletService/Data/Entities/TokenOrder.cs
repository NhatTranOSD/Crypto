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
        public string ReceiveTxHash { get; set; }

        [Required]
        public string SendTxHash { get; set; }

        public string RevertTxHash { get; set; }

        [Required]
        public DateTime CreatedDate { get; set; }

        [Required]
        public Guid BuyerId { get; set; }

        public string BuyerEmail { get; set; }

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

        [Required]
        public PairType PairType { get; set; }
    }


    public enum TokenOrderStatus
    {
        Pending = 0,
        Failed = 1,
        Successed = 2,
        Reverting = 3,
        Reverted = 4
    }

    public enum PairType
    {
        ETH_FCO = 0,
        ETH_ETH = 1,
        FCO_FCO = 2,
        FCO_ETH = 3
    }
}
