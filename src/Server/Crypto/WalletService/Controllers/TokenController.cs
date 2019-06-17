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
    public class TokenController : ControllerBase
    {
        private readonly IAccountService _accountService;
        private readonly ITransactionService _transactionService;

        public TokenController(IAccountService accountService, ITransactionService transactionService)
        {
            _accountService = accountService;
            _transactionService = transactionService;
        }

        [Route("TokenBalance")]
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> TokenBalance(string address, string tokenname, string contractaddress)
        {
            if (!ModelState.IsValid) return BadRequest();

            var result = await _accountService.TokenBalance(address, tokenname, contractaddress);

            return Ok(result);
        }

        [Route("TokenTxList")]
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> TokenTxList(string address, string contractaddress, string startblock, string endblock, string sort)
        {
            if (!ModelState.IsValid) return BadRequest();

            var result = await _accountService.TokenTxList(address, contractaddress, startblock, endblock, sort);

            return Ok(result);
        }

        [Route("TokenSupply")]
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> TokenSupply(string tokenname, string contractaddress)
        {
            if (!ModelState.IsValid) return BadRequest();

            var result = await _transactionService.GetTokenSupply(tokenname, contractaddress);

            return Ok(result);
        }
    }
}