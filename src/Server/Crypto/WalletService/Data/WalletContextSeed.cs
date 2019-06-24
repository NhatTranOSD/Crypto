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
                        AdminAddress = "0x0B94369D5368acBB6674f11758Be01ae69CDc04f",
                        ContractAddress = "0x6429acbf2a15ef0119aa347b8da5a2dbb6056f29",
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
                        Address = "0x0B94369D5368acBB6674f11758Be01ae69CDc04f",
                        PrivateKey = "9C1204822D02E2D646FAB8B569E39A4DE30E64AD72436FF196AEC9F4B8A900CA",
                        Wallet = walletETH,
                        WalletId = walletETH.Id
                    };

                    Account accountFCO = new Account()
                    {
                        Id = Guid.NewGuid(),
                        Address = "0x0B94369D5368acBB6674f11758Be01ae69CDc04f",
                        PrivateKey = "9C1204822D02E2D646FAB8B569E39A4DE30E64AD72436FF196AEC9F4B8A900CA",
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
