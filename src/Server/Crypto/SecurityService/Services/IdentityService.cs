using AutoMapper;
using Microsoft.AspNetCore.Identity;
using SecurityService.Interfaces;
using SecurityService.Models;
using SecurityService.Models.ResponseModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SecurityService.Services
{
    public class IdentityService : IIdentityService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IMapper _mapper;

        public IdentityService(UserManager<ApplicationUser> userManager, IMapper mapper)
        {
            _userManager = userManager;
            _mapper = mapper;
        }

        public async Task<bool> IsValid(string email)
        {
            var identityResult = await _userManager.FindByEmailAsync(email);

            if (identityResult != null) return true;

            return false;
        }

        public async Task<CreateUserResponse> Create(string firstName, string lastName, string email, string password)
        {
            ApplicationUser appUser = new ApplicationUser { Email = email, UserName = email, FirstName = firstName, LastName = lastName };

            IdentityResult identityResult = await _userManager.CreateAsync(appUser, password);

            return _mapper.Map<CreateUserResponse>(identityResult);
        }

    }
}
