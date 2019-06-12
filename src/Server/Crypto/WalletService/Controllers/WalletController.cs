using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WalletService.Interfaces;
using WalletService.Models.RequestModels;
using WalletService.Models.ResponseModels;

namespace WalletService.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class WalletController : ControllerBase
    {
        private readonly IWalletService _walletService;
        public WalletController(IWalletService walletService)
        {
            _walletService = walletService;
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
    }
}