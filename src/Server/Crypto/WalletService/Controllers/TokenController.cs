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
using WalletService.Models.ResponseModels;

namespace WalletService.Controllers
{
    [Route("api/v1/[controller]")]
    [Authorize]
    [ApiController]
    public class TokenController : ControllerBase
    {
        private readonly IAccountService _accountService;
        private readonly ITransactionService _transactionService;
        private readonly ITokenService _tokenService;

        public TokenController(IAccountService accountService, ITransactionService transactionService, ITokenService tokenService)
        {
            _accountService = accountService;
            _transactionService = transactionService;
            _tokenService = tokenService;
        }

        [Route("TokenInfo")]
        [HttpPost]
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<TokenConfigurationResponseModel>> TokenInfo()
        {
            if (!ModelState.IsValid) return BadRequest();

            TokenConfigurationResponseModel result = await _tokenService.GetTokenInfo();

            return Ok(result);
        }

        [Route("UpdateToken")]
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<bool>> UpdateTokenInfo(TokenConfigurationRequestModel requestModel)
        {
            if (!ModelState.IsValid) return BadRequest();

            bool result = await _tokenService.UpdateTokenInfo(requestModel);

            return Ok(result);
        }

        [Route("TokenBalance")]
        [HttpPost]
        [HttpGet]
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
        [HttpPost]
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
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> TokenSupply(string tokenname, string contractaddress)
        {
            if (!ModelState.IsValid) return BadRequest();

            var result = await _transactionService.GetTokenSupply(tokenname, contractaddress);

            return Ok(result);
        }

        [Route("BuyToken")]
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<bool>> BuyToken(BuyTokenRequestModel requestModel)
        {
            if (!ModelState.IsValid) return BadRequest();

            var result = await _tokenService.BuyToken(requestModel.UserId, requestModel.Amount, requestModel.Pair);

            return Ok(result);
        }

        [Route("TransferTokenToAdmin")]
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<TransferTokenResponseModel>> TransferTokenToAdmin(TransferTokenRequestModel requestModel)
        {
            if (!ModelState.IsValid) return BadRequest();

            string result = await _tokenService.TransferTokenToAdmin(requestModel.UserId, requestModel.Amount);

            TransferTokenResponseModel responseModel = new TransferTokenResponseModel() { TxHash = result };

            return Ok(responseModel);
        }
    }
}