using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WalletService.Data.Entities;
using WalletService.Entities;

namespace WalletService.Data
{
    public class WalletContext : DbContext
    {
        public WalletContext(DbContextOptions<WalletContext> options) : base(options)
        {
        }

        public DbSet<Wallet> Wallets { get; set; }

        public DbSet<Account> Accounts { get; set; }

        public DbSet<WalletCurrency> WalletCurrencys { get; set; }

        public DbSet<TokenConfiguration> TokenConfiguration { get; set; }
        public DbSet<TokenOrder> TokenOrders { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
    }
}
