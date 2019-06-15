using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShoppingService.Interfaces;
using ShoppingService.Models.RequestModels;
using ShoppingService.Models.ResponseModels;

namespace ShoppingService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class OrderController : ControllerBase
    {
        protected readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [Route("Orders")]
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<OrderResponseModel>>> Orders()
        {
            if (!ModelState.IsValid) return BadRequest();

            var result = await _orderService.Orders();

            return Ok(result);
        }

        [Route("Orders/{userId}")]
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<OrderResponseModel>>> Orders(Guid userId)
        {
            if (!ModelState.IsValid) return BadRequest();

            var result = await _orderService.Orders(userId);

            return Ok(result);
        }

        [Route("Create")]
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<OrderResponseModel>> CreateOrder(OrderRequestModel requestModel)
        {
            if (!ModelState.IsValid) return BadRequest();

            var result = await _orderService.CreateOrder(requestModel);

            return Ok(result);
        }
    }
}