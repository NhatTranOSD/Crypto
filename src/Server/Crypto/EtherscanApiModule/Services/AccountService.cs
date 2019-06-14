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

        /// <summary>
        /// Get ETH balance of Ethereum address
        /// </summary>
        /// <param name="address"></param>
        /// <returns></returns>
        public async Task<string> ETHBalance(string address)
        {
            string uri = AccountActions.BuildApi(_etherscanApi, EtherModules.ACCOUNT, EtherActions.BALANCE, new IParamStruct[] {
                new StringParamStruct(EtherParams.ADDRESS, address)
            });

            var responseString = await _httpClient.GetStringAsync(uri);

            ResponseModel response = JsonConvert.DeserializeObject<ResponseModel>(responseString);

            return response.result.ToString();
        }

        /// <summary>
        /// Get balance of address for a Token
        /// </summary>
        /// <param name="address"></param>
        /// <param name="tokenname"></param>
        /// <param name="contractaddress"></param>
        /// <returns></returns>
        public async Task<string> TokenBalance(string address, string tokenname, string contractaddress)
        {
            string uri = AccountActions.BuildApi(_etherscanApi, EtherModules.ACCOUNT, EtherActions.TOKENBALANCE, new IParamStruct[] {
                new StringParamStruct(EtherParams.ADDRESS, address),
                new StringParamStruct(EtherParams.TOKENNAME, tokenname),
                new StringParamStruct(EtherParams.CONTRACTADDRESS, contractaddress),
            });

            var responseString = await _httpClient.GetStringAsync(uri);

            ResponseModel response = JsonConvert.DeserializeObject<ResponseModel>(responseString);

            return response.result.ToString();
        }

        /// <summary>
        /// Get a list of "ERC20 - Token Transfer Events" by Address
        /// </summary>
        /// <param name="address"> Account address</param>
        /// <param name="contractaddress">Address of ERC20 token contract (if not specified lists transfers for all tokens)</param>
        /// <param name="startblock">start looking here</param>
        /// <param name="endblock">end looking there</param>
        /// <param name="sort">Sort asc/desc</param>
        /// <returns></returns>
        public async Task<ResponseModel> TokenTxList(string address,string contractaddress, string startblock, string endblock, string sort)
        {
            string uri = AccountActions.BuildApi(_etherscanApi, EtherModules.ACCOUNT, EtherActions.TOKENTX, new IParamStruct[] {
                new StringParamStruct(EtherParams.ADDRESS, address),
                new StringParamStruct(EtherParams.CONTRACTADDRESS, contractaddress),
                new StringParamStruct(EtherParams.STARTBLOCK, startblock),
                new StringParamStruct(EtherParams.ENDBLOCK, endblock),
                new StringParamStruct(EtherParams.OFFSET, sort),
            });

            var responseString = await _httpClient.GetStringAsync(uri);

            ResponseModel response = JsonConvert.DeserializeObject<ResponseModel>(responseString);

            return response;
        }

        /// <summary>
        /// Get a list of transactions for a specfic address
        /// </summary>
        /// <param name="address">Transaction address</param>
        /// <param name="startblock">start looking here</param>
        /// <param name="endblock">end looking there</param>
        /// <param name="page">Page number</param>
        /// <param name="offset">Max records to return</param>
        /// <param name="sort">Sort asc/desc</param>
        /// <returns></returns>
        public async Task<ResponseModel> ETHTxList(string address,string startblock,string endblock,int page,int offset,string sort)
        {
            string uri = AccountActions.BuildApi(_etherscanApi, EtherModules.ACCOUNT, EtherActions.TXLIST, new IParamStruct[] {
                new StringParamStruct(EtherParams.ADDRESS, address),
                new StringParamStruct(EtherParams.STARTBLOCK, startblock),
                new StringParamStruct(EtherParams.ENDBLOCK, endblock),
                new NumParamStruct(EtherParams.PAGE, page),
                new NumParamStruct(EtherParams.OFFSET, offset),
                new StringParamStruct(EtherParams.OFFSET, sort),
            });

            var responseString = await _httpClient.GetStringAsync(uri);

            ResponseModel response = JsonConvert.DeserializeObject<ResponseModel>(responseString);

            return response;
        }

        /// <summary>
        /// Get a list of internal transactions
        /// </summary>
        /// <param name="txhash">Transaction hash. If specified then address will be ignored</param>
        /// <param name="address">Transaction address</param>
        /// <param name="startblock">Start looking here</param>
        /// <param name="endblock">End looking there</param>
        /// <param name="sort">Sort asc/desc</param>
        /// <returns></returns>
        public async Task<ResponseModel> ETHTxListInternal(string txhash, string address = null, string startblock = null, string endblock = null, string sort = null)
        {
            string uri = AccountActions.BuildApi(_etherscanApi, EtherModules.ACCOUNT, EtherActions.TXLISTINTERNAL, new IParamStruct[] {
                new StringParamStruct(EtherParams.TXHASH, txhash),
                new StringParamStruct(EtherParams.ADDRESS, address),
                new StringParamStruct(EtherParams.STARTBLOCK, startblock),
                new StringParamStruct(EtherParams.ENDBLOCK, endblock),
                new StringParamStruct(EtherParams.OFFSET, sort),
            });

            var responseString = await _httpClient.GetStringAsync(uri);

            ResponseModel response = JsonConvert.DeserializeObject<ResponseModel>(responseString);

            return response;
        }

    }
}
