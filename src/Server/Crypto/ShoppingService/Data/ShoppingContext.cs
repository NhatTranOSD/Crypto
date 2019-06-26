using Microsoft.EntityFrameworkCore;
using ShoppingService.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ShoppingService.Data.Helpers;

namespace ShoppingService.Data
{
    public class ShoppingContext : DbContext
    {
        public ShoppingContext(DbContextOptions<ShoppingContext> options) : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<Order> Orders { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
        public PageList<Product> GetProducts(int pageNumber, int pageSize)
        {
            IQueryable<Product> query = Products;
            return PageList<Product>.Create(query,  pageNumber,  pageSize);
        }
    }
}
