using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WalletService.Common
{
    public class Web3Actions
    {
        public static string CreateAccountUri(string baseUri) => $"{baseUri}createAccount";
        public static string SendETH(string baseUri, string to, decimal value) => $"{baseUri}sendETHTransaction?to={to}&value={value}";
        public static string SendToken(string baseUri, string to, decimal value) => $"{baseUri}sendToken?to={to}&value={value}";
    }
}
