using AutoMapper;
using Microsoft.AspNetCore.Identity;
using SecurityService.Models;
using SecurityService.Models.ResponseModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SecurityService.Common
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<IdentityResult, CreateUserResponse>();
            CreateMap<SignInResult, LoginResponse>();
        }

    }
}