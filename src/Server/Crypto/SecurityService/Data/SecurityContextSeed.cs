using Microsoft.AspNetCore.Identity;
using SecurityService.Common;
using SecurityService.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SecurityService.Data
{
    public class SecurityContextSeed
    {
        public static async Task SeedAsync(UserManager<ApplicationUser> userManager)
        {
            try
            {
                if (userManager.FindByEmailAsync("admin@orientsoftware.com").Result == null)
                {
                    ApplicationUser user = new ApplicationUser
                    {
                        Id = "0f07555c-00b6-4be9-ab0f-e75c7617efe4",
                        Email = "admin@orientsoftware.com",
                        UserName = "admin@orientsoftware.com",
                        FirstName = "Orient",
                        LastName = "Software Development",
                        JwtRole = JwtRole.Admin,
                        EmailConfirmed = true,
                    };

                    IdentityResult result = await userManager.CreateAsync(user, "12345678X@x");
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
    }
}
