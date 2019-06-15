using System;
using System.Collections.Generic;
using System.Text;

namespace EtherscanApiModule.Common
{
    public static class AccountActions
    {
        public static string BuildUri(string baseUri, string module, string action, IParamStruct[] paras = null)
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
