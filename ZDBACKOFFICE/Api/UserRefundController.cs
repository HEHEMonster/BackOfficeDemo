using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace ZDBACKOFFICE.Web.Controllers
{
    using ZDBACKOFFICE.Core;
    using ZDBACKOFFICE.Data;
    using ZDBACKOFFICE.Entity.Models;
    using ZDBACKOFFICE.Web.Authorization;
    using static ZDBACKOFFICE.Permission;
    using static ZDBACKOFFICE.Enums.OrderType;

    [Permission(RefundAudit)]
    [Route("api/UserRefund")]
    public class UserRefundController : BaseController
    {
        private readonly IInMemoryRepository<UserRefund> _rUserRefund;
        private readonly IInMemoryRepository<AuditRecord> _rAuditRecord;
        private readonly IInMemoryRepository<UserOrders> _rUserOrders;
        private readonly IInMemoryRepository<UserInfo> _rUserInfo;
        private readonly IInMemoryRepository<ActivityInfo> _rActivityInfo;
        private readonly ILoginUserProvider _loginUserProvider;


        public UserRefundController(IInMemoryRepository<UserRefund> rUserRefund, IInMemoryRepository<AuditRecord> rAuditRecord,
             IInMemoryRepository<UserOrders> rUserOrders, IInMemoryRepository<UserInfo> rUserInfo, IInMemoryRepository<ActivityInfo> rActivityInfo, ILoginUserProvider loginUserProvider)
        {
            _rUserRefund = rUserRefund;
            _rAuditRecord = rAuditRecord;
            _rUserOrders = rUserOrders;
            _rUserInfo = rUserInfo;
            _rActivityInfo = rActivityInfo;
            _loginUserProvider = loginUserProvider;

        }

        [HttpGet("GetUserRefundList")]
        public JsonResult GetUserRefundList()
        {
            return JsonResultTryCatch(() => Json(new
            {
                IsSuccess = true,
                data = _rUserRefund
                        .DbSet()
                        .Include(r => r.User)
                        .Include(r => r.Order)
                        .AsNoTracking()
                        .ToList<object>()
            }));
        }

        [HttpPut("UpdateUserRefund")]
        public IActionResult UpdateUserRefund([FromForm]int key, [FromForm]string values)
        {
            var UserRefund = new UserRefund();

            UserRefund = _rUserRefund.GetById(key);
            var preStatus = UserRefund.Status;
            JsonConvert.PopulateObject(values, UserRefund);

            _rUserRefund.otherOperation += () =>
            {
                _rAuditRecord.InsertWithOutTransaction(new AuditRecord
                {
                    AuditId = UserRefund.Id.ToString(),
                    AuditType = (int)AuditType.Refund,
                    AuditDate = DateTime.Now,
                    AuditorId = _loginUserProvider.GetUserID(),
                    Remark = UserRefund.Remark,
                    PreStatus = preStatus,
                    ToStatus = UserRefund.Status
                });
            };

            _rUserRefund.otherOperation += () =>
            {
                var UserOrders = new UserOrders();
                UserOrders = _rUserOrders.List(m => m.OrderId == UserRefund.OrderId).FirstOrDefault();
                UserOrders.Status = UserRefund.Status == -1 ? 4 : 3;
                // 赚道会员
                if (UserOrders.OrderType == Vip.ToValue() && UserRefund.Status == 1)
                {
                    var userInfo = _rUserInfo.List(u => u.UserId == UserOrders.UserId).FirstOrDefault();
                    userInfo.Vip = 0;
                    _rUserInfo.UpdateWithOutTransaction(userInfo);
                }
                // 活动
                if (UserOrders.OrderType == Activity.ToValue() && UserRefund.Status == 1)
                {
                    var actInfo = _rActivityInfo.GetById(UserOrders.SourceId);
                    // 活动参加人数减一, 嘉宾表移除该用户
                    actInfo.Attendance -= 1;
                    var actguest = actInfo.ActivityGuests.FirstOrDefault(g => g.UserId == UserOrders.UserId);
                    actInfo.ActivityGuests.Remove(actguest);
                    _rActivityInfo.UpdateWithOutTransaction(actInfo);
                }
                _rUserOrders.UpdateWithOutTransaction(UserOrders);
            };

            int i = _rUserRefund.Update(UserRefund);
            if (i > 0)
            {
                return new OkObjectResult(new { Message = "OK" });
            }
            return new OkObjectResult(new { Message = "False" });
        }

        [HttpPost("InsertUserRefund")]
        public IActionResult InsertUserRefund([FromForm]string values)
        {
            var UserRefund = new UserRefund
            {
                CreateDate = DateTime.Now,
                UpdateDate = DateTime.Now
            };

            JsonConvert.PopulateObject(values, UserRefund);

            int i = _rUserRefund.Insert(UserRefund);
            if (i > 0)
            {
                return new OkObjectResult(new { Message = "OK" });
            }
            return new OkObjectResult(new { Message = "False" });
        }
    }
}
