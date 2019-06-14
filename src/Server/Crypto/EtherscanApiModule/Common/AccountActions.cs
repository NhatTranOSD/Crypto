using System;
using System.Collections.Generic;
using System.Text;

namespace EtherscanApiModule.Common
{
    public static class AccountActions
    {
        public static string ETHBalance(string baseUri, string address) => $"{baseUri}&module=account&action=balance&address={address}";

        public static string TokenBalance(string baseUri, string address, string tokenname, string contractaddress)
                                        => $"{baseUri}&module=account&action=tokenbalance&address={address}&tokenname={tokenname}&contractaddress={contractaddress}";

        public static string ETHTxList(string baseUri, string address, string startblock, string endblock, int page, int offset, string sort)
                                        => $"{baseUri}&module=account&action=txlist&address={address}&startblock={startblock}&endblock={endblock}&page={page}&offset={offset}&sort={sort}";

        public static string ETHTxListInternal(string baseUri,string txhash, string address, string startblock, string endblock, string sort)
                                        => $"{baseUri}&module=account&action=txlist&txhash={txhash}&address={address}&startblock={startblock}&endblock={endblock}&sort={sort}";

        public static string BuildApi(string baseUri, string module, string action, IParamStruct[] paras = null)
        {
            string apiString = $"{baseUri}&module={module}&action={action}";

            if (paras == null) return apiString;

            foreach (var obj in paras)
            {
                apiString = string.Concat(apiString, $"&{obj.getName()}={obj.getValue()}");
            }

            return apiString;
        }


    }
}
