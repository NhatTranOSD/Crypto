using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EtherscanApiModule.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WalletService.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class ETHController : ControllerBase
    {
        private readonly IAccountService _accountService;
        private readonly ITransactionService _transactionService;

        public ETHController(IAccountService accountService, ITransactionService transactionService)
        {
            _accountService = accountService;
            _transactionService = transactionService;
        }

        [Route("ETHBalance")]
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> ETHBalance(string address)
        {
            if (!ModelState.IsValid) return BadRequest();

            var result = await _accountService.ETHBalance(address);

            return Ok(result);
        }

        [Route("ETHTxList")]
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> ETHTxList(string address, int page, int offset, string sort)
        {
            if (!ModelState.IsValid) return BadRequest();

            var result = await _accountService.ETHTxList(address, "1", "latest", page, offset, sort); // Make default

            return Ok(result);
        }
    }
}