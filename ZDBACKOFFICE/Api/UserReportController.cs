using Microsoft.AspNetCore.Mvc;

namespace ZDBACKOFFICE.Web.Controllers
{
    using ZDBACKOFFICE.Core;
    [Route("api/userReport")]
    public class UserReportController : BaseController
    {
        private readonly IUserReportRepo _userReportRepo;

        public UserReportController(IUserReportRepo userReportRepo)
        {
            _userReportRepo = userReportRepo;
        }

        [HttpGet("list")]
        public IActionResult GetUserReportList(Audit.UserReport.Criteria criteria)
            => criteria.PageOf(x => _userReportRepo.GetUserReportsList(criteria));
    }
}