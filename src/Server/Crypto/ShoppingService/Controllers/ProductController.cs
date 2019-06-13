using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShoppingService.Interfaces;
using ShoppingService.Models.RequestModels;

namespace ShoppingService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        protected readonly IProductService _productService;

        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [Route("Products")]
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> Products()
        {
            if (!ModelState.IsValid) return BadRequest();

            var result = await _productService.Products();

            return Ok(result);
        }

        [Route("Create")]
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<bool>> CreateProduct(ProductRequestModel requestModel)
        {
            if (!ModelState.IsValid) return BadRequest();

            var result = await _productService.CreateProduct(requestModel);

            return Ok(result);
        }

        [Route("{id}/Update")]
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<bool>> UpdateProduct(string id, ProductRequestModel requestModel)
        {
            if (!ModelState.IsValid) return BadRequest();

            var result = await _productService.UpdateProduct(id, requestModel);

            return Ok(result);
        }

        [Route("{id}/Delete")]
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<bool>> DeleteProduct(string id)
        {
            if (!ModelState.IsValid || string.IsNullOrEmpty(id)) return BadRequest();

            var result = await _productService.DeleteProduct(id);

            return Ok(result);
        }
    }
}