using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace ZDBACKOFFICE.Web.Authorization
{
    public class AuthorizeRolesAttribute : AuthorizeAttribute
    {
        public AuthorizeRolesAttribute(params string[] roles) : base()
        {
            Roles = string.Join(",", roles);
        }
    }
}