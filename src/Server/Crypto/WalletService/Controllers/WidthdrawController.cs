using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EtherscanApiModule.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WalletService.Interfaces;
using WalletService.Models.RequestModels;

namespace WalletService.Controllers
{
    [Route("api/v1/[controller]")]
    [Authorize]
    [ApiController]
    public class WidthdrawController : ControllerBase
    {
        private readonly IAccountService _accountService;
        private readonly ITransactionService _transactionService;
        private readonly IWidthdrawService _widthdrawService;

        public WidthdrawController(IAccountService accountService, ITransactionService transactionService, IWidthdrawService widthdrawService)
        {
            _accountService = accountService;
            _transactionService = transactionService;
            _widthdrawService = widthdrawService;
        }


        [Route("Widthdraw")]
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<bool>> Widthdraw(WidthdrawModel requestModel)
        {
            if (!ModelState.IsValid) return BadRequest();

            var result = await _widthdrawService.Widthdraw(requestModel.UserId, requestModel.Amount, requestModel.Address, requestModel.Pair);

            return Ok(result);
        }


    }
}