using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WalletService.Interfaces;

namespace WalletService.Controllers
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

        [Route("TokenOrdersChart")]
        [HttpGet]
        [Authorize(Roles = "Admin")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<decimal>>> OrdersChart()
        {
            if (!ModelState.IsValid) return BadRequest();

            var result = await _chartService.TotalOrderData();

            return Ok(result);
        }
    }
}