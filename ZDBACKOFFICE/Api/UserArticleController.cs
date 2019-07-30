using System.Linq;
using Microsoft.AspNetCore.Mvc;

namespace ZDBACKOFFICE.Web.Controllers
{
    using ZDAIRecognizer;
    using ZDBACKOFFICE.Web;
    using ZDBACKOFFICE.Core;
    using ZDBACKOFFICE.Web.Authorization;
    using ZDBACKOFFICE.Web.ViewModels;
    using static ZDBACKOFFICE.Permission;

    [Permission(ArticleAudit)]
    [Route("api/userArticle")]
    public class UserArticleController : BaseController
    {
        private readonly IUserArticleRepo _userArticleRepo;

        private readonly IBaiduNaturalLanguageRecognizer _baiduNaturalLanguageRecognizer;

        public UserArticleController(IUserArticleRepo userArticleRepo
        , IBaiduNaturalLanguageRecognizer baiduNaturalLanguageRecognizer
        )
        {
            _userArticleRepo = userArticleRepo;
            _baiduNaturalLanguageRecognizer = baiduNaturalLanguageRecognizer;
        }

        /*获取文章列表*/

        [HttpGet("list")]
        public IActionResult GetUserArticleList(Audit.UserArticleList.Criteria criteria)
             => criteria.PageOf(x => _userArticleRepo.GetUserArticleList(x));

        /*获取标签*/

        [HttpPost("tags")]
        public IActionResult GetTagsByAIAnync([FromBody]ArticleTagViewModel model)
            => TryCatchR(() => _baiduNaturalLanguageRecognizer.TopicTag(model.Title, model.Content).Items.Select(x => x.Tag));

        /*提交审核*/
        [HttpPost("audit")]
        public IActionResult AuditUserArticle([FromBody]UserArticleAuditViewModel model)
            => OnAction<UserArticleAuditViewModel, Audit.UserArticleAuditDto>(model, _userArticleRepo.AuditUserArticle);

        /*添加标签*/
        [HttpPost("addTags")]
        //[Permission(ArticleContentManage)]
        public IActionResult ArticleAddTags([FromBody]UserArticleAuditViewModel model)
            => OnAction<UserArticleAuditViewModel, Audit.UserArticleAuditDto>(model, _userArticleRepo.ArticleAddTags);

    }
}
