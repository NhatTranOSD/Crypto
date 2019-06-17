using System;
using System.Collections.Generic;
using System.Text;

namespace EtherscanApiModule.Common
{
    public static class EtherModules
    {
        public static string ACCOUNT = "account";
        public static string TRANSACTION = "transaction";
        public static string STATS = "stats";
    }

    public static class FCOToken
    {
        public static string TOKENNAME = "FCoin";
        public static string CONTRACT = "0x6429acbf2a15ef0119aa347b8da5a2dbb6056f29";
    }

    public static class EtherActions
    {
        public static string BALANCE = "balance";
        public static string TOKENBALANCE = "tokenbalance";
        public static string TXLIST = "txlist";
        public static string TOKENTX = "tokentx";
        public static string TXLISTINTERNAL = "txlistinternal";
        public static string GETSTATUS = "getstatus";
        public static string ETHPRICE = "ethprice";
        public static string TOKENSUPPLY = "tokensupply";
    }

    public static class EtherParams
    {
        public static string ADDRESS = "address";
        public static string TOKENNAME = "tokenname";
        public static string CONTRACTADDRESS = "contractaddress";
        public static string STARTBLOCK = "startblock";
        public static string ENDBLOCK = "endblock";
        public static string PAGE = "page";
        public static string OFFSET = "offset";
        public static string SORT = "sort";
        public static string TXHASH = "txhash";
    }
}
