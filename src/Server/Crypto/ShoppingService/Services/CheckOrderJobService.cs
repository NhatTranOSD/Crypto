using Common.BackgroundJob;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using ShoppingService.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace ShoppingService.Services
{
    public class CheckOrderJobService : HostedService
    {
        private readonly IServiceScopeFactory _serviceScopeFactory;

        public CheckOrderJobService(IServiceScopeFactory serviceScopeFactory)
        {
            _serviceScopeFactory = serviceScopeFactory;
        }

        protected override async Task ExecuteAsync(CancellationToken cancellationToken)
        {
            while (!cancellationToken.IsCancellationRequested)
            {
                //await _randomStringProvider.UpdateString(cancellationToken);
                await Process(cancellationToken);
                await Task.Delay(TimeSpan.FromMinutes(1), cancellationToken);
            }
        }

        private async Task Process(CancellationToken cancellationToken)
        {
            using (var scope = this._serviceScopeFactory.CreateScope())
            {
                var _context = scope.ServiceProvider.GetService<ShoppingContext>();

                var orderProcessing = await _context.Orders.Where(x => x.OrderStatus == Common.OrderStatus.Processing).ToListAsync();

                if (orderProcessing.Any())
                {
                    foreach (var order in orderProcessing)
                    {
                        // Request to update order status here

                        await _context.SaveChangesAsync(CancellationToken.None);
                    }
                }
            }


        }
    }
}
