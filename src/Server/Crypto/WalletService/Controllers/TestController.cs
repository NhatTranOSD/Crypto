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
        public TestController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpGet]
        public async Task<ActionResult> GetAsync()
        {
            var result = await _accountService.Balance("0x0B94369D5368acBB6674f11758Be01ae69CDc04f");

            return null;
        }
    }
}