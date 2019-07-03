using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EtherscanApiModule.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WalletService.Interfaces;
using WalletService.Models.RequestModels;

namespace WalletService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        private readonly IAccountService _accountService;
        private readonly IWalletService _walletService;
        private readonly ITransactionService _transactionService;
        private readonly IWeb3Service _web3Service;

        public TestController(IWalletService walletService, IAccountService accountService, ITransactionService transactionService, IWeb3Service web3Service)
        {
            _accountService = accountService;
            _transactionService = transactionService;
            _web3Service = web3Service;
            _walletService = walletService;
        }

        [HttpGet]
        public async Task<ActionResult<string>> GetAsync()
        {
            //var result = await _accountService.ETHBalance("0x0B94369D5368acBB6674f11758Be01ae69CDc04f");

            //var price = await _transactionService.GetEtherPrice();

            //var status = await _transactionService.GetStatus("0x9579d5308bc29b2dbb1e760cd43fce4a4ae70b7cea753b4fd610c463e45bfc45");

            //var tokenTxList = await _accountService.TokenTxList("0x0B94369D5368acBB6674f11758Be01ae69CDc04f", "0x6429acbf2a15ef0119aa347b8da5a2dbb6056f29", "1", "latest", "asc"); // Make default

            //var TXList = await _accountService.ETHTxList("0x0B94369D5368acBB6674f11758Be01ae69CDc04f", "1", "latest", 1, 15, "asc");

            //var eth = await _web3Service.SendETH("0xB6DB9AFF2b8436C748a528A41CeBE0E58c7fD075", 1000000000);
            //var token = await _web3Service.SendToken("0xB6DB9AFF2b8436C748a528A41CeBE0E58c7fD075", 1000000000);

            return null;
        }
    }
}