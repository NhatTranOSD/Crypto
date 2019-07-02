using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ShoppingService.Data;
using ShoppingService.Data.Entities;
using ShoppingService.Data.Helpers;
using ShoppingService.Interfaces;
using ShoppingService.Models.RequestModels;
using ShoppingService.Models.ResponseModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Korzh.EasyQuery.Linq;

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
                    Stock = requestModel.Stock,
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
                    product.Stock = requestModel.Stock;
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

        public async Task<ProductListResponseModel> GetProductLists(int pageNumber, int pageSize)
        {
            try
            {
                var productAll = await _shoppingContext.Products.ToListAsync();
                var products = await _shoppingContext.Products.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();

                var totalCountPerPage = products.Count();
                var totalCountAll = productAll.Count;

                IList<ProductResponseModel> response = _mapper.Map<IList<ProductResponseModel>>(products);

                var paginationMetaData = new PagingHeader
                {
                    TotalItems = totalCountAll,
                    PageNumber = pageNumber,
                    PageSize = pageSize,
                    TotalPages = (int)Math.Ceiling(totalCountAll / (double)pageSize),
                };

                var productList = new ProductListResponseModel
                {
                    Paging = paginationMetaData,
                    Product = response,
                };
                return productList;
            }
            catch (Exception ex)
            {
                return null;
                throw ex;
            }
        }
        public async Task<ProductListResponseModel> SearchProducts(string text, int pageNumber, int pageSize)
        {
            var productListSearch = new List<Product>();
            try
            {
                //
                if (!string.IsNullOrEmpty(text))
                {
                    productListSearch  = await _shoppingContext.Products.FullTextSearchQuery(text).ToListAsync();
                }
                else
                {
                    productListSearch = await _shoppingContext.Products.ToListAsync();
                }

                var products =  productListSearch.Skip((pageNumber - 1) * pageSize).Take(pageSize);
                var totalCountPerPage = products.Count();
                var totalCountAll = productListSearch.Count;

                IList<ProductResponseModel> response = _mapper.Map<IList<ProductResponseModel>>(products);

                var paginationMetaData = new PagingHeader
                {
                    TotalItems = totalCountAll,
                    PageNumber = pageNumber,
                    PageSize = pageSize,
                    TotalPages = (int)Math.Ceiling(totalCountAll / (double)pageSize),
                };

                var productList = new ProductListResponseModel
                {
                    Paging = paginationMetaData,
                    Product = response,
                };
                return productList;
            }
            catch (Exception ex)
            {
                return null;
                throw ex;
            }
        }
    }
}
