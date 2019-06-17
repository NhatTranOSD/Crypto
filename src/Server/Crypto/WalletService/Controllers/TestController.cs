using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EtherscanApiModule.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WalletService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        private readonly IAccountService _accountService;
        private readonly ITransactionService _transactionService;

        public TestController(IAccountService accountService, ITransactionService transactionService)
        {
            _accountService = accountService;
            _transactionService = transactionService;
        }

        [HttpGet]
        public async Task<ActionResult<string>> GetAsync()
        {
            var result = await _accountService.ETHBalance("0x0B94369D5368acBB6674f11758Be01ae69CDc04f");

            var price = await _transactionService.GetEtherPrice();

            var status = await _transactionService.GetStatus("0x9579d5308bc29b2dbb1e760cd43fce4a4ae70b7cea753b4fd610c463e45bfc45");

            var tokenTxList = await _accountService.TokenTxList("0x0B94369D5368acBB6674f11758Be01ae69CDc04f", "0x6429acbf2a15ef0119aa347b8da5a2dbb6056f29", "1", "latest", "asc"); // Make default

            var TXList = await _accountService.ETHTxList("0x0B94369D5368acBB6674f11758Be01ae69CDc04f", "1", "latest", 1, 15, "asc");

            return result;
        }
    }
}