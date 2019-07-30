using Microsoft.AspNetCore.Authorization;

namespace ZDBACKOFFICE.Authorization
{
    public class PermissionAuthorizationRequirement : IAuthorizationRequirement
    {
        public PermissionAuthorizationRequirement(string permissionName)
        {
            PermissionName = permissionName;
        }
        public string PermissionName { get; private set; }
    }
}