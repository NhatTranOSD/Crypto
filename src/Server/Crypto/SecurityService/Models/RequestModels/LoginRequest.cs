﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SecurityService.Models.RequestModels
{
    public class LoginRequest
    {
        public string UserName { get; set; }

        public string PassWord { get; set; }
    }
}
