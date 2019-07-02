using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SecurityService.Entities.RequestModels
{
    public class EmailConfirmationRequest
    {
        public string UserId { get; set; }
        public string Code { get; set; }
    }
}
