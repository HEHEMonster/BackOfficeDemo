using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace ZDBACKOFFICE.Authorization
{   
    public class PermissionHandler : AuthorizationHandler<PermissionAuthorizationRequirement>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, PermissionAuthorizationRequirement requirement)
        {
            if (context.User != null)
            {
                if (context.User.IsInRole(Role.Admin))
                {
                    context.Succeed(requirement);
                }
                else
                {
                    var claims = context.User.Claims;
                    var result = claims.Where(x => x.Type == IdentityModel.JwtClaimTypes.Role && x.Value == requirement.PermissionName);
                    if (result != null)
                    {
                        context.Succeed(requirement);
                    }
                }
            }
            return Task.CompletedTask;
        }
    }
}