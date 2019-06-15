using Common.Settings;
using EtherscanApiModule.Common;
using EtherscanApiModule.Interfaces;
using EtherscanApiModule.Models.ResponseModels;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace EtherscanApiModule.Services
{
    public class TransactionService : ITransactionService
    {
        private readonly IOptions<EtherscanSettings> _settings;
        private readonly HttpClient _httpClient;
        private readonly string _etherscanApi;

        public TransactionService(IOptions<EtherscanSettings> settings, HttpClient httpClient)
        {
            _httpClient = httpClient;
            _settings = settings;

            _etherscanApi = $"{_settings.Value.ApiUri}?apikey={_settings.Value.ApiKeyToken}";
        }

        /// <summary>
        /// returns the status of a specific transaction hash
        /// </summary>
        /// <param name="txhash"></param>
        /// <returns></returns>
        public async Task<ResponseModel> GetStatus(string txhash)
        {
            string uri = AccountActions.BuildUri(_etherscanApi, EtherModules.TRANSACTION, EtherActions.GETSTATUS, new IParamStruct[] {
                new StringParamStruct(EtherParams.TXHASH, txhash)
            });

            var responseString = await _httpClient.GetStringAsync(uri);

            ResponseModel response = JsonConvert.DeserializeObject<ResponseModel>(responseString);

            return response;
        }

        /// <summary>
        /// Returns the price of ether now
        /// </summary>
        /// <returns>price of ether</returns>
        public async Task<int> GetEtherPrice()
        {
            string uri = AccountActions.BuildUri(_etherscanApi, EtherModules.STATS, EtherActions.ETHPRICE);

            var responseString = await _httpClient.GetStringAsync(uri);

            return Convert.ToInt32(responseString);
        }
    }

}
