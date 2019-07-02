using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShoppingService.Data;
using ShoppingService.Interfaces;
using ShoppingService.Models.RequestModels;

namespace ShoppingService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        protected readonly IProductService _productService;
        private readonly IMapper _mapper;

        public ProductController(IProductService productService, IMapper mapper)
        {
            _productService = productService;
            _mapper = mapper;
            
        }

        [AllowAnonymous]
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
        [Authorize(Roles = "Admin")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<bool>> CreateProduct(ProductRequestModel requestModel)
        {
            if (!ModelState.IsValid) return BadRequest();

            var result = await _productService.CreateProduct(requestModel);

            return Ok(result);
        }

        [Route("{id}/Update")]
        [Authorize(Roles = "Admin")]
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
        [Authorize(Roles = "Admin")]
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<bool>> DeleteProduct(string id)
        {
            if (!ModelState.IsValid || string.IsNullOrEmpty(id)) return BadRequest();

            var result = await _productService.DeleteProduct(id);

            return Ok(result);
        }
               
        //[HttpGet]
        //public async Task<ActionResult> GetProducts(int pageNumber, int pageSize)
        //{
        //    if (!ModelState.IsValid) return BadRequest();

        //    var result = await _productService.GetProductLists(pageNumber, pageSize);

        //    return Ok(result);
        //}

        [HttpGet]
        public async Task<ActionResult> SearchProducts(string text, int pageNumber, int pageSize)
        {
            if (!ModelState.IsValid) return BadRequest();

            var result = await _productService.SearchProducts(text, pageNumber, pageSize);
           
            return Ok(result);
        }
    }
}