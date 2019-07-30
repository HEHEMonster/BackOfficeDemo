using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace ZDBACKOFFICE.Web.Controllers
{
    using ZDAIRecognizer;
    using ZDBACKOFFICE.Web;
    using ZDBACKOFFICE.Core;
    using ZDBACKOFFICE.Web.Authorization;
    using ZDBACKOFFICE.Web.ViewModels;
    using static ZDBACKOFFICE.Permission;
    using ZDBACKOFFICE.Entity.Models;
    using System.Linq.Expressions;

    [Permission(ActivityManage)]
    [Route("api/Activity")]
    public class ActivityController : BaseController
    {
        private readonly IInMemoryRepository<ActivityInfo> _rActivityInfo;
        private readonly IActivityRepo _activityRepo;

     
        public ActivityController(IActivityRepo activityRepo, IInMemoryRepository<ActivityInfo> rActivityInfo)
        {
            _activityRepo = activityRepo;
            _rActivityInfo = rActivityInfo;
        }

        [HttpGet("GetActivityList")]
        public IActionResult GetActivityList(Audit.Activity.Criteria criteria)
        =>criteria.PageOf(x => _activityRepo.GetActivitList(x));

        [HttpGet("{id}")]
        public IActionResult GetActivityDetails(int id)
        {
           var result= new OkObjectResult(_activityRepo.GetActivityDetails(id));
            return result;
        }

        [HttpPut("UpdateActivity")]
        public IActionResult UpdateActivity([FromForm]int key, [FromForm]string values)
        {
            var ActivityInfo = new ActivityInfo();
            ActivityInfo = _rActivityInfo.GetById(key);
            JsonConvert.PopulateObject(values, ActivityInfo);

            int i = _rActivityInfo.Update(ActivityInfo);
            if (i > 0)
            {
                return new OkObjectResult(new { Message = "OK" });
            }
            return new OkObjectResult(new { Message = "False" });
        }
        [HttpPost("InsertActivity")]
        public IActionResult InsertActivity([FromForm]string values)
        {
            var ActivityInfo = new ActivityInfo
            {
                CreateDate = DateTime.Now,
                UpdateDate = DateTime.Now
            };

            JsonConvert.PopulateObject(values, ActivityInfo);

            int i = _rActivityInfo.Insert(ActivityInfo);
            if (i > 0)
            {
                return new OkObjectResult(new { Message = "OK" });
            }
            return new OkObjectResult(new { Message = "False" });
        }
    }
}
