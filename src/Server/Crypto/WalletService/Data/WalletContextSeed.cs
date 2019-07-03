using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WalletService.Data.Entities;
using WalletService.Entities;

namespace WalletService.Data
{
    public class WalletContextSeed
    {
        public static async Task SeedAsync(WalletContext walletContext)
        {
            try
            {
                // Init config
                if (walletContext.TokenConfiguration.Count() == 0)
                {
                    TokenConfiguration tokenConfiguration = new TokenConfiguration()
                    {
                        Id = Guid.NewGuid(),
                        AdminAddress = "0xB6DB9AFF2b8436C748a528A41CeBE0E58c7fD075",
                        PrivateKey = "6F54D6673EBD23BA891774DEC47AEB3919592A27D740EC4D4A79D7582E6484DC",
                        ContractAddress = "0xcdc915cf1a9ddd30e604112dd47b88d604c29075",
                        TokenName = "FCoin",
                        TokenSymbol = "FCO",
                        Decimals = 18,
                        PriceUSD = 10,
                        GasLimit = 21000,
                        GasPricesInGwei = 3.7,
                    };

                    await walletContext.TokenConfiguration.AddAsync(tokenConfiguration);

                    await walletContext.SaveChangesAsync();
                };

                if (walletContext.Wallets.Count() == 0)
                {
                    // Init ETH currency (Default)
                    WalletCurrency ETH = new WalletCurrency()
                    {
                        Balance = "0",
                        CurrencyType = CurrencyType.ETH,
                        Id = Guid.NewGuid(),
                        UpdatedDate = DateTime.UtcNow,
                    };

                    // Init FCO currency (Default)
                    WalletCurrency FCO = new WalletCurrency()
                    {
                        Balance = "0",
                        CurrencyType = CurrencyType.FCO,
                        Id = Guid.NewGuid(),
                        UpdatedDate = DateTime.UtcNow,
                    };

                    await walletContext.WalletCurrencys.AddRangeAsync(ETH, FCO);

                    Wallet walletETH = new Wallet()
                    {
                        Id = Guid.NewGuid(),
                        CreatedDate = DateTime.UtcNow,
                        UserId = "0f07555c-00b6-4be9-ab0f-e75c7617efe4",
                        WalletCurrency = ETH
                    };

                    Wallet walletFCO = new Wallet()
                    {
                        Id = Guid.NewGuid(),
                        CreatedDate = DateTime.UtcNow,
                        UserId = "0f07555c-00b6-4be9-ab0f-e75c7617efe4",
                        WalletCurrency = FCO
                    };

                    await walletContext.Wallets.AddRangeAsync(walletETH, walletFCO);

                    Account accountETH = new Account()
                    {
                        Id = Guid.NewGuid(),
                        Address = "0xB6DB9AFF2b8436C748a528A41CeBE0E58c7fD075",
                        PrivateKey = "6F54D6673EBD23BA891774DEC47AEB3919592A27D740EC4D4A79D7582E6484DC",
                        Wallet = walletETH,
                        WalletId = walletETH.Id
                    };

                    Account accountFCO = new Account()
                    {
                        Id = Guid.NewGuid(),
                        Address = "0xB6DB9AFF2b8436C748a528A41CeBE0E58c7fD075",
                        PrivateKey = "6F54D6673EBD23BA891774DEC47AEB3919592A27D740EC4D4A79D7582E6484DC",
                        Wallet = walletFCO,
                        WalletId = walletFCO.Id
                    };

                    await walletContext.Accounts.AddRangeAsync(accountETH, accountFCO);

                    await walletContext.SaveChangesAsync();
                };
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
    }
}
