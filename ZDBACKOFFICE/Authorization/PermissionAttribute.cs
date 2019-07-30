using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace ZDBACKOFFICE.Web.Authorization
{
    public class PermissionAttribute : AuthorizeAttribute
    {
        public PermissionAttribute(params string[] permissions) : base()
        {   
            // todo
            // 暂时找不到验证自定义cliamType的解决方案，先用Roles顶替一下
            Roles = string.Join(",", permissions);
        }
    }
}