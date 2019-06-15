using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShoppingService.Data.Entities
{
    public class Product
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public int Stock { get; set; }

        public Decimal Price { get; set; }

        public string Currency { get; set; } = "FCO";

        public string PictureUri { get; set; }
    }
}
