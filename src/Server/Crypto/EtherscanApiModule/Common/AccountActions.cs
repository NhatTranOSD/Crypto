using System;
using System.Collections.Generic;
using System.Text;

namespace EtherscanApiModule.Common
{
    public static class AccountActions
    {
        public static string Balance(string baseUri, string address) => $"{baseUri}&module=account&action=balance&address={address}";
        public static string TokenBalance(string baseUri, string address, string tokenname, string contractaddress)
                                        => $"{baseUri}&module=account&action=tokenbalance&address={address}&tokenname={tokenname}&contractaddress={contractaddress}";
    }
}
