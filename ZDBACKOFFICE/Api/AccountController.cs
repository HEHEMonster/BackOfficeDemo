using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;

namespace ZDBACKOFFICE.Web.Controllers
{
    using ZDBACKOFFICE.Core;
    using ZDBACKOFFICE.Web.ViewModels;

    [Authorize]
    [Route("api/account")]
    public class AccountController : BaseController
    {
        private readonly ISystemUserRepo _systemUserRepo;
        private readonly ILoginUserProvider _loginUserProvider;

        public AccountController(ISystemUserRepo systemUserRepo, ILoginUserProvider loginUserProvider)
        {
            _systemUserRepo = systemUserRepo;
            _loginUserProvider = loginUserProvider;
        }

        [AllowAnonymous]
        [HttpGet]
        public IActionResult Login(string returnUrl) => new OkObjectResult(returnUrl);

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody]LoginViewModel model)
        {
            if (!ModelState.IsValid) return new BadRequestObjectResult(ActionResult.Bad("数据异常"));
            var op = await _loginUserProvider.Login(model.UserName, model.Password);
            if (op == null) return new BadRequestObjectResult(ActionResult.Bad("账户名或密码错误"));
            return new OkObjectResult(ActionResult.Ok(new { op.Name, roles = op.RoleNames.ToArray() }));
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody]LoginViewModel model)
        {
            if (!ModelState.IsValid) return new BadRequestObjectResult(ActionResult.Bad("数据异常"));
            var op = _loginUserProvider.Authenticate(model.UserName, model.Password);
            if (op == null) return new BadRequestObjectResult(ActionResult.Bad("账户名或密码错误"));
            return new OkObjectResult(ActionResult.Ok(new
            {
                access_token = op.Token,
                token_type = "Bearer",
                name = op.Name
            }));
        }

        //修改密码
        [HttpPost("changePassword")]
        public IActionResult ChangePassword([FromBody]ChangePasswordViewModel model)
            => OnAction<ChangePasswordViewModel, System.ChangePasswordDto>(model, _systemUserRepo.ChangePassword);

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync();
            return Ok();
        }
    }
}
