using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace WalletService.Data
{
    public class WalletContextFactory : IDesignTimeDbContextFactory<WalletContext>
    {
        public WalletContext CreateDbContext(string[] args)
        {
            IConfigurationRoot configuration = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json")
            .Build();

            var connectionString = configuration.GetConnectionString("WalletDBConnection");

            var optionsBuilder = new DbContextOptionsBuilder<WalletContext>();
            optionsBuilder.UseSqlServer(connectionString);

            return new WalletContext(optionsBuilder.Options);
        }
    }
}
