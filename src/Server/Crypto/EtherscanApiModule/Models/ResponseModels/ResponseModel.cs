using System;
using System.Collections.Generic;
using System.Text;

namespace EtherscanApiModule.Models.ResponseModels
{
    public class ResponseModel
    {
        public string status { get; set; }
        public string message { get; set; }
        public object result { get; set; }
    }
}
