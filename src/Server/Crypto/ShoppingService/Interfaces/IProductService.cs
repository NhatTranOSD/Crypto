using ShoppingService.Models.RequestModels;
using ShoppingService.Models.ResponseModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShoppingService.Interfaces
{
    public interface IProductService
    {
        Task<IEnumerable<ProductResponseModel>> Products();

        Task<bool> CreateProduct(ProductRequestModel requestModel);

        Task<bool> UpdateProduct(string productId, ProductRequestModel requestModel);

        Task<bool> DeleteProduct(string productId);

        Task<ProductListResponseModel> GetProductLists(int pageNumber, int pageSize);

    }
}
