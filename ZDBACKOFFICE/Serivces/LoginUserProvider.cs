using System;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Security.Claims;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using IdentityModel;

namespace ZDBACKOFFICE.Web.Services
{
    using ZDBACKOFFICE.Core;
    using ZDBACKOFFICE.Model;
    public class LoginUserProvider : ILoginUserProvider
    {
        private readonly HttpContext _httpContext;
        private readonly ISystemUserRepo _systemUserRepo;
        private readonly JwtBearerConfig _jwtBearerConfig;

        public LoginUserProvider(IHttpContextAccessor httpContextAccessor, ISystemUserRepo systemUserRepo, IOptions<JwtBearerConfig> jwtBearerConfig)
        {
            _systemUserRepo = systemUserRepo;
            _httpContext = httpContextAccessor.HttpContext;
            _jwtBearerConfig = jwtBearerConfig.Value;
        }

        public async Task<System.OperatorLoginResult> Login(string username, string password)
        {
            var op = _systemUserRepo.GetSystemOperator(username, password);

            if (op == null) return null;

            var claims = new List<Claim> {
                new Claim(ClaimTypes.Name, op.Name),
                new Claim("UserID",op.OperatorID)
             };
            foreach (var roleName in op.RoleNames)
            {
                claims.Add(new Claim(ClaimTypes.Role, roleName));
            }

            var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
            ClaimsPrincipal user = new ClaimsPrincipal(claimsIdentity);

            await _httpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, user,
            new AuthenticationProperties()
            {
                IsPersistent = true,                                    // 持久Cookie和绝对到期时间  
                AllowRefresh = true                                     // 允许有效时间刷新
                                                                        // ExpiresUtc = DateTimeOffset.UtcNow.AddMinutes(60),      // 有效时间
            });
            return op;
        }


        public System.OperatorLoginResult Authenticate(string username, string password)
        {
            var op = _systemUserRepo.GetSystemOperator(username, password);

            if (op == null) return null;

            var claims = new List<Claim> {
                new Claim("UserID", op.OperatorID),
                new Claim(JwtClaimTypes.Name, op.Name),
                new Claim(JwtClaimTypes.Audience, _jwtBearerConfig.Audience),
                new Claim(JwtClaimTypes.Issuer, _jwtBearerConfig.Issuer)
             };
            // foreach (var roleName in op.RoleNames)
            // {
            //     claims.Add(new Claim(JwtClaimTypes.Role, roleName));
            // }
            
            var permissions= new List<string>();

            foreach (var names in op.PermissionNames)
            {
                permissions.AddRange(names);
            }
            
            foreach(var permission in permissions.Distinct())
            {
                claims.Add(new Claim(JwtClaimTypes.Role, permission));
            }

            var key = Encoding.ASCII.GetBytes(_jwtBearerConfig.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            op.Token = tokenHandler.WriteToken(token);
            return op;
        }

        public string GetUserID()
        {
            return _httpContext?.User?.Claims.FirstOrDefault(x => x.Type.Equals("UserID"))?.Value;
        }
    }
}
