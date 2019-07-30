using System;
using Microsoft.AspNetCore.Mvc;

namespace ZDBACKOFFICE.Web.Controllers
{
    using ZDBACKOFFICE.Web;
    using ZDBACKOFFICE.Utils;
    using ZDBACKOFFICE.Core;
    using ZDBACKOFFICE.Web.ViewModels;
    using ZDBACKOFFICE.Web.Authorization;
    using static ZDBACKOFFICE.Permission;

    [Permission(IDCardAudit)]
    [Route("api/userIdCard")]
    public class UserIDCardController : BaseController
    {
        private readonly IUserIDCardRepo _userIDCardRepo;

        public UserIDCardController(IUserIDCardRepo userIDCardRepo)
        {
            _userIDCardRepo = userIDCardRepo;
        }

        [HttpGet("list")]
        public IActionResult GetUserIdcardList(Audit.UserIDCard.Criteria criteria)
            => criteria.PageOf(x => _userIDCardRepo.GetUserIDcardList(x));

        [HttpGet("{id}")]
        public IActionResult GetUserIdcardDetails(Guid id)
            => new OkObjectResult(_userIDCardRepo.GetUserIDcardDetails(id));

        [HttpPost("audit")]
        public IActionResult AuditUserIDCard([FromBody]IDCardAuditViewModal model)
            => OnAction<IDCardAuditViewModal, Audit.UserIDCardAuditDto>(model, _userIDCardRepo.AuditUserIDcard);

        [HttpPost("export")]
        public IActionResult ExportUserIDCardList([FromBody]Audit.UserIDCard.Criteria criteria)
            => File(_userIDCardRepo.GetUserIDcardList(criteria.SetMaxPageSize()).ToExcel(ExportMappings.UserIDCardExportConfig), "application/vnd.ms-excel");

    }
}
