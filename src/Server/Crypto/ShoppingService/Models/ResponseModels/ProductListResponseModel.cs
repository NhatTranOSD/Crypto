using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ShoppingService.Data.Helpers;

namespace ShoppingService.Models.ResponseModels
{
    public class ProductListResponseModel
    {
        public PagingHeader Paging { get; set; }
        public IList<ProductResponseModel> Product { get; set; }
    }
}
