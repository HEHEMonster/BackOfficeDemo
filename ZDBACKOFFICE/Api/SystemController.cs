using Microsoft.AspNetCore.Mvc;

namespace ZDBACKOFFICE.Web.Controllers
{
    using ZDBACKOFFICE.Core;
    using ZDBACKOFFICE.Web.Authorization;
    using ZDBACKOFFICE.Web.ViewModels;
    using static ZDBACKOFFICE.Permission;

    [Permission(SystemManage)]
    [Route("api/system")]
    public class SystemController : BaseController
    {
        private readonly ISystemUserRepo _systemUserRepo;

        public SystemController(ISystemUserRepo systemUserRepo)
        {
            _systemUserRepo = systemUserRepo;
        }

        [HttpGet("operators")]
        public IActionResult GetSystemOperators(System.Operator.Criteria criteria)
            => criteria.PageOf(x => _systemUserRepo.GetSystemOperators(x));

        [HttpGet("roles")]
        public IActionResult GetSystemRoles(System.Roles.Criteria criteris)
            => criteris.PageOf(x => _systemUserRepo.GetSystemRolesList(x));

        [HttpPost("create/operator")]
        public IActionResult CreateOperator([FromBody]CreateOperatorViewModel model)
            => OnAction(model, () => _systemUserRepo.CreateOperator(model.Name));

        /*新增角色*/
        [HttpPost("create/role")]
        public IActionResult CreateRole([FromBody]CreateRoleViewModel model)
            => OnAction(model, () => _systemUserRepo.CreateRole(model.Name, model.Description));

        [HttpGet("all/roles")]
        public IActionResult GetAllRolesForAssgin()
            => TryCatch(() => new OkObjectResult(_systemUserRepo.GetAllRolesForAssign()));

        [HttpPost("assgin/roles")]
        public IActionResult AssignRoles([FromBody]AssignRolesViewModel model)
            => OnAction<AssignRolesViewModel, System.AssignRolesDto>(model, _systemUserRepo.AssignRoles);

        /*角色状态 */
        [HttpPost("IsEnable")]
        public IActionResult IsEnableRole([FromBody] CreateRoleViewModel model)
            => OnAction<CreateRoleViewModel, System.IsEnableDto>(model, _systemUserRepo.IsEnableRole);

        [HttpGet("all/permission")]
        public IActionResult GetAllPermissionForAssgin()
            => TryCatch(() => new OkObjectResult(_systemUserRepo.GetAllPermissionForAssign()));

        [HttpPost("assign/permission")]
        public IActionResult AssignPermission([FromBody]AssignPermissionViewModel model)
            => OnAction<AssignPermissionViewModel, System.AssignPermissionDto>(model, _systemUserRepo.AssignPermission);

        /*获取所有操作员 */
        [HttpGet("all/Operator")]
        public IActionResult GetAllOperator()
            => TryCatch(() => new OkObjectResult(_systemUserRepo.GetAllOperator()));
    }
}
