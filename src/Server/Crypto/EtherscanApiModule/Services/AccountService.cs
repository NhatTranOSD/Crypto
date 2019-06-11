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
    public class AccountService : IAccountService
    {
        private readonly IOptions<EtherscanSettings> _settings;
        private readonly HttpClient _httpClient;
        private readonly string _etherscanApi;

        public AccountService(IOptions<EtherscanSettings> settings, HttpClient httpClient)
        {
            _httpClient = httpClient;
            _settings = settings;

            _etherscanApi = $"{_settings.Value.ApiUri}?apikey={_settings.Value.ApiKeyToken}";
        }

        public async Task<string> Balance(string address)
        {
            string uri = AccountActions.Balance(_etherscanApi, address);

            var responseString = await _httpClient.GetStringAsync(uri);

            ResponseModel response = JsonConvert.DeserializeObject<ResponseModel>(responseString);

            return response.result.ToString();
        }

        public async Task<string> TokenBalance(string address, string tokenname, string contractaddress)
        {
            string uri = AccountActions.TokenBalance(_etherscanApi, address, tokenname, contractaddress);

            var responseString = await _httpClient.GetStringAsync(uri);

            ResponseModel response = JsonConvert.DeserializeObject<ResponseModel>(responseString);

            return response.result.ToString();
        }
    }
}
