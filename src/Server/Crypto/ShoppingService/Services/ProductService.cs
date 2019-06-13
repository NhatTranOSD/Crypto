using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ShoppingService.Data;
using ShoppingService.Data.Entities;
using ShoppingService.Interfaces;
using ShoppingService.Models.RequestModels;
using ShoppingService.Models.ResponseModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShoppingService.Services
{
    public class ProductService : IProductService
    {
        private readonly ShoppingContext _shoppingContext;
        private readonly IMapper _mapper;

        public ProductService(ShoppingContext shoppingContext, IMapper mapper)
        {
            _shoppingContext = shoppingContext;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ProductResponseModel>> Products()
        {
            try
            {
                IList<Product> products = await _shoppingContext.Products.ToListAsync();

                IList<ProductResponseModel> response = _mapper.Map<IList<ProductResponseModel>>(products);

                return response;
            }
            catch (Exception ex)
            {
                return null;
                throw ex;
            }
        }

        public async Task<bool> CreateProduct(ProductRequestModel requestModel)
        {
            try
            {
                Product product = new Product()
                {
                    Id = Guid.NewGuid(),
                    Description = requestModel.Description,
                    Name = requestModel.Name,
                    PictureUri = requestModel.PictureUri,
                    Price = requestModel.Price,
                };

                await _shoppingContext.Products.AddAsync(product);

                await _shoppingContext.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                return false;
                throw ex;
            }
        }

        public async Task<bool> UpdateProduct(string productId, ProductRequestModel requestModel)
        {
            try
            {
                Product product = await _shoppingContext.Products.SingleOrDefaultAsync(x => x.Id.ToString().Equals(productId));

                if (product != null)
                {
                    product.Name = requestModel.Name;
                    product.Description = requestModel.Description;
                    product.PictureUri = requestModel.PictureUri;
                    product.Price = requestModel.Price;
                }

                _shoppingContext.Products.Update(product);

                await _shoppingContext.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                return false;
                throw ex;
            }
        }

        public async Task<bool> DeleteProduct(string productId)
        {
            try
            {
                Product product = await _shoppingContext.Products.SingleOrDefaultAsync(x => x.Id.ToString().Equals(productId));

                if (product != null)
                {
                    _shoppingContext.Products.Remove(product);

                    await _shoppingContext.SaveChangesAsync();
                }
                else
                {
                    return false;
                }

                return true;
            }
            catch (Exception ex)
            {
                return false;
                throw ex;
            }
        }
    }
}
