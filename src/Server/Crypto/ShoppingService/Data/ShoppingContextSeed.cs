using ShoppingService.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShoppingService.Data
{
    public class ShoppingContextSeed
    {
        public static async Task SeedAsync(ShoppingContext shoppingContext)
        {
            try
            {
                if (shoppingContext.Products.Count() == 0)
                {
                    List<Product> products = new List<Product>()
                    {
                        new Product(){ Id = Guid.NewGuid(),
                            Description = "Màn hình OLED chất lượng cao rộng 6.5 inch đầu tiên của Apple",
                            Name = "iPhone Xs Max 512GB",
                            PictureUri = "https://cdn.tgdd.vn/Products/Images/42/191482/iphone-xs-max-512gb-gold-400x460.png",
                            Price = 1500,
                            Stock = 20
                        },
                        new Product(){ Id = Guid.NewGuid(),
                            Description = "Thiết kế quen thuộc vốn có của dòng iPhone Apple",
                            Name = "iPhone 8 Plus 256GB",
                            PictureUri = "https://cdn.tgdd.vn/Products/Images/42/114114/iphone-8-plus-256gb-gold-400x460.png",
                            Price = 800,
                            Stock = 200
                        },
                    };

                    await shoppingContext.AddRangeAsync(products);

                    await shoppingContext.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
    }
}
