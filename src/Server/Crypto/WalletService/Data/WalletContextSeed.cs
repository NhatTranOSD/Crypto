using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WalletService.Entities;

namespace WalletService.Data
{
    public class WalletContextSeed
    {
        public static async Task SeedAsync(WalletContext walletContext)
        {
            try
            {
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

                    await walletContext.AddAsync(tokenConfiguration);

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
