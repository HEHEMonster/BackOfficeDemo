using System.Linq;
using Microsoft.AspNetCore.Mvc;

namespace ZDBACKOFFICE.Web.Controllers
{
    using ZDAIRecognizer;
    using ZDBACKOFFICE.Web;
    using ZDBACKOFFICE.Core;
    using ZDBACKOFFICE.Web.ViewModels;
    using ZDBACKOFFICE.Web.Authorization;
    using static ZDBACKOFFICE.Permission;

    [Permission(ProductAudit)]
    [Route("api/userProduct")]
    public class UserProductController : BaseController
    {
        private readonly IUserProductRepo _userProductRepo;
        private readonly INaturalLanguageRecognizer _naturalLanguageService;
        private readonly IBaiduNaturalLanguageRecognizer _baiduNaturalLanguageRecognizer;

        public UserProductController(IUserProductRepo userProductRepo
        , INaturalLanguageRecognizer naturalLanguageService
        , IBaiduNaturalLanguageRecognizer baiduNaturalLanguageRecognizer)
        {
            _userProductRepo = userProductRepo;
            _naturalLanguageService = naturalLanguageService;
            _baiduNaturalLanguageRecognizer = baiduNaturalLanguageRecognizer;
        }

        [HttpGet("list")]
        public IActionResult GetUserProductList(Audit.UserProduct.Criteria criteria)
        {
            return criteria.PageOf(x => _userProductRepo.GetUserProductList(x));
        }

        [HttpPost("tags")]
        public IActionResult GetTagsByAiAsync([FromBody]ProductTagViewModel model)
            => TryCatchR(() => _baiduNaturalLanguageRecognizer.TopicTag(model.Title, model.Content).Items.Select(x => x.Tag));

        [HttpPost("audit")]
        public IActionResult AuditUserProduct([FromBody]UserProductAuditViewModel model)
            => OnAction<UserProductAuditViewModel, Audit.UserProductAuditDto>(model, _userProductRepo.AuditUserProduct);

        [HttpPost("addTags")]
        // [Permission(ProductContentManage)]
        public IActionResult ProductAddTags([FromBody]UserProductAuditViewModel model)
            => OnAction<UserProductAuditViewModel, Audit.UserProductAuditDto>(model, _userProductRepo.ProductAddTags);
    }
}