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

            var price = _transactionService.GetEtherPrice();

            return result;
        }
    }
}