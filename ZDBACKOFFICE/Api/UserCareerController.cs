using Microsoft.AspNetCore.Mvc;

namespace ZDBACKOFFICE.Web.Controllers
{
    using ZDBACKOFFICE.Core;
    using ZDBACKOFFICE.Utils;
    using ZDBACKOFFICE.Web.ViewModels;
    using ZDBACKOFFICE.Web.Authorization;
    using static ZDBACKOFFICE.Permission;

    [Permission(CareerAudit)]
    [Route("api/userCareer")]
    public class UserCareerController : BaseController
    {
        private readonly IUserCareerRepo _userCareerRepo;

        public UserCareerController(IUserCareerRepo userCareerRepo)
        {
            _userCareerRepo = userCareerRepo;
        }

        [HttpGet("list")]
        public IActionResult GetCareerList(Audit.UserCareers.Criteria criteria)
            => TryCatch(() => criteria.PageOf(x => _userCareerRepo.GetUserCareerList(x)));

        [HttpPost("audit")]
        public IActionResult AuditUserCareer([FromBody]UserCareerAuditViewModel model)
            => OnAction<UserCareerAuditViewModel, Audit.UserCareerAuditDto>(model, _userCareerRepo.AuditUserCareer);

        [HttpPost("export")]
        public IActionResult UserCareerToExcel([FromBody]Audit.UserCareers.Criteria criteria)
            => File(_userCareerRepo.GetUserCareerList(criteria.SetMaxPagSize()).ToExcel(ExportMappings.UserCareerExportConfig),"application/vnd.ms-excel");
    }
}
