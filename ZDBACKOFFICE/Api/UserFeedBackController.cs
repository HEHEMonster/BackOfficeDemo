using Microsoft.AspNetCore.Mvc;

namespace ZDBACKOFFICE.Web.Controllers
{
    using ZDBACKOFFICE.Web;
    using ZDBACKOFFICE.Core;
    using ZDBACKOFFICE.Web.Authorization;
    using ZDBACKOFFICE.Web.ViewModels;
    using static ZDBACKOFFICE.Permission;

    [Permission(FeekbackManage)]
    [Route("api/feedback")]
    public class UserFeedBackController : BaseController
    {
        private readonly IUserFeedBackRepo _userFeedBackRepo;
        public UserFeedBackController(IUserFeedBackRepo userFeedBackRepo)
        {
            _userFeedBackRepo = userFeedBackRepo;
        }

        [HttpGet("list")]
        public IActionResult GetFeedBackList(UserFeedBackList.Criteria criteria)
             => criteria.PageOf(x => _userFeedBackRepo.GetFeedBackList(x));

        [HttpPost("create")]
        public IActionResult CreateFeedBack([FromBody]CreateFeedBackViewModel model)
            => OnAction<CreateFeedBackViewModel,CreateFeedBackDto>(model,_userFeedBackRepo.CreateFeedBack);
    }
}
