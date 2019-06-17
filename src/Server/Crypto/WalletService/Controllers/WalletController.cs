using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WalletService.Interfaces;
using WalletService.Entities.RequestModels;
using WalletService.Entities.ResponseModels;
using Microsoft.AspNetCore.Authorization;
using EtherscanApiModule.Interfaces;

namespace WalletService.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    [Authorize]
    public class WalletController : ControllerBase
    {
        private readonly IWalletService _walletService;
        private readonly IAccountService _accountService;
        public WalletController(IWalletService walletService, IAccountService accountService)
        {
            _walletService = walletService;
            _accountService = accountService;
        }

        [Route("{userId}")]
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> GetInfoByUserId(string userId)
        {
            if (!ModelState.IsValid) return BadRequest();

            var result = await _walletService.GetInfoByUserId(userId);

            return Ok(result);
        }

        [Route("Create")]
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<bool>> Create(CreateRequestModel requestModel)
        {
            if (!ModelState.IsValid) return BadRequest();

            var result = await _walletService.CreateWallet(requestModel);

            return Ok(result);
        }

        [Route("{id}/Update")]
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> Update(string id)
        {
            return Ok();
        }

        [Route("{id}/AddCurrency")]
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> AddCurrency(string id)
        {
            return Ok();
        }

        [Route("{address}/ETHBalance")]
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> ETHBalance(string address)
        {
            if (!ModelState.IsValid) return BadRequest();

            var result = await _accountService.ETHBalance(address);

            return Ok(result);
        }

        [Route("{address}/TokenBalance")]
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> TokenBalance(string address)
        {
            if (!ModelState.IsValid) return BadRequest();

            var result = await _accountService.TokenBalance(address, "", "0x6429acbf2a15ef0119aa347b8da5a2dbb6056f29"); // Make default is FCO

            return Ok(result);
        }

        [Route("{address}/TokenTxList")]
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> TokenTxList(string address)
        {
            if (!ModelState.IsValid) return BadRequest();

            var result = await _accountService.TokenTxList(address, "0x6429acbf2a15ef0119aa347b8da5a2dbb6056f29", "1", "latest", "asc"); // Make default

            return Ok(result);
        }

        [Route("{address}/ETHTxList")]
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> ETHTxList(string address)
        {
            if (!ModelState.IsValid) return BadRequest();

            var result = await _accountService.ETHTxList(address, "1", "latest", 1, 100, "asc"); // Make default

            return Ok(result);
        }
    }
}