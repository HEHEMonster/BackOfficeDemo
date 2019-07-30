using System.Linq;
using Microsoft.AspNetCore.Mvc;

namespace ZDBACKOFFICE.Web.Controllers
{
    using ZDBACKOFFICE.Core;
    using ZDBACKOFFICE.Entity.Models;
    using ZDBACKOFFICE.Web.Authorization;
    using static ZDBACKOFFICE.Permission;

    [Permission(RefundAudit)]
    [Route("api/UserOrder")]
    public class UserOrderController : BaseController
    {
        private readonly IInMemoryRepository<UserOrders> _rUserOrders;
        private readonly ILoginUserProvider _loginUserProvider;

        public UserOrderController(IInMemoryRepository<UserOrders> rUserOrders, ILoginUserProvider loginUserProvider)
        {
            _rUserOrders = rUserOrders;
            _loginUserProvider = loginUserProvider;

        }

        [HttpGet("GetUserOrderList")]
        public JsonResult GetUserOrderList()
        {
            var data = _rUserOrders.DbSet().ToList<object>();
            return JsonResultTryCatch(() => Json(new { IsSuccess = true, data }));
        }

        [HttpGet("GetUserOrderByOrderId")]
        public JsonResult GetUserOrderByOrderId(string orderid)
        {
            var data = _rUserOrders.List(m => m.OrderId == orderid).First();
            return JsonResultTryCatch(() => Json(new { IsSuccess = true, data }));
        }
    }
}
