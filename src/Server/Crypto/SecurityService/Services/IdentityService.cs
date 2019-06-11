using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using SecurityService.Common;
using SecurityService.Interfaces;
using SecurityService.Models;
using SecurityService.Models.ResponseModels;
using SecurityService.Settings;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace SecurityService.Services
{
    public class IdentityService : IIdentityService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IMapper _mapper;
        private readonly IEmailService _emailService;
        private readonly AppSettings _appSettings;
        private readonly IAppLogger<IdentityService> _logger;

        public IdentityService(UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            IMapper mapper,
            IEmailService emailService,
            IOptions<AppSettings> appSettings,
            IAppLogger<IdentityService> logger)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _mapper = mapper;
            _emailService = emailService;
            _appSettings = appSettings.Value;
            _logger = logger;
        }

        public async Task<bool> IsValid(string email)
        {
            var identityResult = await _userManager.FindByEmailAsync(email);

            if (identityResult != null) return true;

            return false;
        }

        public async Task<CreateUserResponse> Create(string firstName, string lastName, string email, string password)
        {
            _logger.LogInformation("Create new User");

            try
            {
                ApplicationUser appUser = new ApplicationUser { Email = email, UserName = email, FirstName = firstName, LastName = lastName, JwtRole = JwtRole.User };

                IdentityResult identityResult = await _userManager.CreateAsync(appUser, password);

                if (identityResult.Succeeded)
                {
                    string confirmationToken = _userManager.GenerateEmailConfirmationTokenAsync(appUser).Result;

                    string callbackUrl = string.Format("https://localhost:5001/api/v1/Identity/ConfirmEmail/{0}?code={1}", appUser.Id, confirmationToken);

                    await _emailService.SendEmailAsync(email, "Confirm Email", callbackUrl);
                }

                CreateUserResponse result = _mapper.Map<CreateUserResponse>(identityResult);

                return result;
            }
            catch (Exception ex)
            {
                _logger.LogWarning("Failed to Create new User");
                return null;
                throw ex;
            }
        }

        public async Task<bool> ConfirmEmail(string userId, string code)
        {
            _logger.LogInformation("Confirm user Email");

            try
            {
                ApplicationUser user = await _userManager.FindByIdAsync(userId);

                if (user != null)
                {
                    IdentityResult result = await _userManager.ConfirmEmailAsync(user, code);
                    return result.Succeeded ? true : false;
                }

                return false;
            }
            catch (Exception ex)
            {
                _logger.LogWarning("Failed to Create new User");
                return false;
                throw ex;
            }
        }

        public async Task<LoginResponse> Login(string userName, string password)
        {
            _logger.LogInformation("User Login with User Name: {0}", userName);
            try
            {
                var identityResult = await _signInManager.PasswordSignInAsync(userName, password, false, lockoutOnFailure: false);

                if (identityResult.Succeeded)
                {
                    var user = _userManager.Users.SingleOrDefault(x => x.UserName == userName);

                    LoginResponse result = _mapper.Map<LoginResponse>(identityResult);

                    result.Id = user?.Id;
                    result.FirstName = user?.FirstName;
                    result.LastName = user?.LastName;
                    result.UserName = user?.UserName;

                    result.Token = GenerateJwtSecurityToken(user.Id, user.JwtRole);

                    return result;
                }

                return _mapper.Map<LoginResponse>(identityResult);
            }
            catch (Exception ex)
            {
                _logger.LogWarning("Failed to login User Name: {0}", userName);
                return null;
                throw ex;
            }

        }

        private string GenerateJwtSecurityToken(string userId, string userRole)
        {
            try
            {
                // authentication successful so generate jwt token
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim(ClaimTypes.Name, userId),
                        new Claim(ClaimTypes.Role, userRole)
                    }),
                    Expires = DateTime.UtcNow.AddDays(7),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };
                var token = tokenHandler.CreateToken(tokenDescriptor);

                return tokenHandler.WriteToken(token);
            }
            catch (Exception ex)
            {
                return null;
                throw ex;
            }
        }

    }
}
