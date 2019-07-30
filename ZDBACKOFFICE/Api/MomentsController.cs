using System.Linq;
using Microsoft.AspNetCore.Mvc;

namespace ZDBACKOFFICE.Web.Controllers
{
    using ZDAIRecognizer;
    using ZDBACKOFFICE.Core;
    using ZDBACKOFFICE.Core.MongoDBModels;
    using ZDBACKOFFICE.Web.ViewModels;
    using ZDBACKOFFICE.Web.Authorization;
    using static ZDBACKOFFICE.Permission;

    [Permission(MomentsManage)]
    [Route("api/moments")]
    public class MomentsController : BaseController
    {
        private readonly IMomentsRepo _momentsRepo;
        private readonly IBaiduNaturalLanguageRecognizer _baiduNaturalLanguageRecognizer;

        public MomentsController(IMomentsRepo momentsRepo, IBaiduNaturalLanguageRecognizer baiduNaturalLanguageRecognizer)
        {
            _momentsRepo = momentsRepo;
            _baiduNaturalLanguageRecognizer = baiduNaturalLanguageRecognizer;
        }

        [HttpGet("list")]
        public IActionResult GetMomentsList(Moments.Citeria criteria)
            => TryCatch(() => criteria.PageOf(c => _momentsRepo.GetMomentsList(criteria ?? new Moments.Citeria())));

        [HttpDelete]
        public IActionResult Delete(MomentsDeleteViewModel model)
            => TryCatch(() => OnAction<MomentsDeleteViewModel, DeleteMomentsDto>(model, _momentsRepo.DeleteMoment));

        [HttpPost("tags")]
        public IActionResult GetTagsByAIAnync([FromBody]MomentsTagViewModel model)
            => TryCatchR(() => _baiduNaturalLanguageRecognizer.TopicTag(model.Title, model.Content).Items.Select(x => x.Tag));

        // [Permission(MomentsContentManage)]
        [HttpPut("update/tags")]
        public IActionResult UpdateMomentsTags([FromBody]MomentsTagsViewModel model)
            => TryCatch(() => OnAction<MomentsTagsViewModel, UpdateMomentsDto>(model, _momentsRepo.UpdateMomentsTags));
    }
}
