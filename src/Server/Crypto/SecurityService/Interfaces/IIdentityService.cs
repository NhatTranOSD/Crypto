using Microsoft.AspNetCore.Identity;
using SecurityService.Models.ResponseModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SecurityService.Interfaces
{
    public interface IIdentityService
    {
        Task<CreateUserResponse> Create(string firstName, string lastName, string email, string password);

        Task<LoginResponse> Login(string userName, string password);

        Task<bool> ConfirmEmail(string userId, string code);
    }
}
