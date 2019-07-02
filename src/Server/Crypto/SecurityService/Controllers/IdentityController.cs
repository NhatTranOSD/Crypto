using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SecurityService.Interfaces;
using SecurityService.Entities.RequestModels;
using SecurityService.Entities.ResponseModels;

namespace SecurityService.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class IdentityController : ControllerBase
    {
        private readonly IIdentityService _identityService;
        public IdentityController(IIdentityService identityService)
        {
            _identityService = identityService;
        }

        [Route("Create")]
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<CreateUserResponse>> Create([FromBody] CreateUserRequest requestModel)
        {
            if (requestModel == null || !ModelState.IsValid) return BadRequest("Invlid model");

            string host = Request.Host.Value;

            var result = await _identityService.Create(requestModel.FirstName, requestModel.LastName, requestModel.Email, requestModel.PassWord, host);

            return Ok(result);
        }

        [Route("ConfirmEmail/{userId}")]
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<CreateUserResponse>> ConfirmEmail(EmailConfirmationRequest requestModel)
        {
            if (string.IsNullOrEmpty(requestModel.UserId) || string.IsNullOrEmpty(requestModel.Code)) return BadRequest("Invlid model");

            var result = await _identityService.ConfirmEmail(requestModel.UserId, requestModel.Code);

          return Ok(result);
        }

        [Route("Login")]
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<LoginResponse>> Login([FromBody] LoginRequest requestModel)
        {
            if (requestModel == null || !ModelState.IsValid) return BadRequest("Invlid model");

            var result = await _identityService.Login(requestModel.UserName, requestModel.PassWord);

            return Ok(result);
        }
    }
}