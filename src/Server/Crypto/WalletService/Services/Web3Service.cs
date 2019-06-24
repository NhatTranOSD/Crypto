using AutoMapper;
using Common.Settings;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using WalletService.Common;
using WalletService.Data;
using WalletService.Data.Entities;
using WalletService.Interfaces;

namespace WalletService.Services
{
    public class Web3Service : IWeb3Service
    {
        private readonly WalletContext _walletContext;
        private readonly IMapper _mapper;
        private readonly HttpClient _httpClient;
        private readonly string _ethereumGatewayApi;
        private readonly IOptions<EthereumGatewaySettings> _settings;

        public Web3Service(WalletContext walletContext, IMapper mapper, IOptions<EthereumGatewaySettings> settings, HttpClient httpClient)
        {
            _walletContext = walletContext;
            _mapper = mapper;
            _settings = settings;
            _httpClient = httpClient;

            _ethereumGatewayApi = _settings?.Value.ApiUri;
        }

        public async Task<Account> CreateAccount(Guid walletId)
        {
            try
            {
                string uri = Web3Actions.CreateAccountUri(_ethereumGatewayApi);

                var responseString = await _httpClient.GetStringAsync(uri);

                JObject jsonObj = JObject.Parse(responseString);

                // check result status
                bool success = (bool)jsonObj.Property("successed").Value;
                if (!success) return null;

                Account account = JsonConvert.DeserializeObject<Account>(jsonObj.Property("result").Value.ToString());
                account.Id = Guid.NewGuid();
                account.WalletId = walletId;

                await _walletContext.Accounts.AddAsync(account);
                await _walletContext.SaveChangesAsync();

                return account;
            }
            catch (Exception ex)
            {
                return null;
                throw ex;
            }
        }

        public async Task<string> SendETH(string to, decimal value)
        {
            try
            {
                string uri = Web3Actions.SendETH(_ethereumGatewayApi, to, value);

                var responseString = await _httpClient.GetStringAsync(uri);

                JObject jsonObj = JObject.Parse(responseString);

                // check result status
                bool success = (bool)jsonObj.Property("successed").Value;
                if (!success) return null;

                string txHash = jsonObj.Property("result").First.First.First.ToString();

                return txHash;
            }
            catch (Exception ex)
            {
                return null;
                throw ex;
            }
        }

        public async Task<string> SendToken(string to, decimal value)
        {
            try
            {
                string uri = Web3Actions.SendToken(_ethereumGatewayApi, to, value);

                var responseString = await _httpClient.GetStringAsync(uri);

                JObject jsonObj = JObject.Parse(responseString);

                // check result status
                bool success = (bool)jsonObj.Property("successed").Value;
                if (!success) return null;

                string txHash = jsonObj.Property("result").First.First.First.ToString();

                return txHash;
            }
            catch (Exception ex)
            {
                return null;
                throw ex;
            }
        }
    }
}
