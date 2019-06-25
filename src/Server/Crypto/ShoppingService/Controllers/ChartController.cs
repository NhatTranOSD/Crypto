using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShoppingService.Interfaces;

namespace ShoppingService.Controllers
{
    [Route("api/v1/[controller]")]
    [Authorize]
    [ApiController]
    public class ChartController : ControllerBase
    {
        private readonly IChartService _chartService;
        public ChartController(IChartService chartService)
        {
            _chartService = chartService;
        }

        [Route("OrdersChart")]
        [HttpGet]
        [Authorize(Roles = "Admin")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<decimal>>> OrdersChart()
        {
            if (!ModelState.IsValid) return BadRequest();

            var result = await _chartService.OrderData();

            return Ok(result);
        }
    }
}