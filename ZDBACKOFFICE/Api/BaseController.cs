using System;
using Microsoft.AspNetCore.Mvc;

namespace ZDBACKOFFICE.Web.Controllers
{
    using ZDBACKOFFICE.Data;

    //[Authorize]
    public abstract class BaseController : Controller
    {
        protected IActionResult TryCatch<T>(Func<T> func) where T : IActionResult
        {
            try
            {
                return func();
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult(ActionResult.Bad(ex.Message));
            }
        }
        
        protected IActionResult TryCatchR<T>(Func<T> func) where T : class
        {
            try
            {
                return  new OkObjectResult(func());
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult(ActionResult.Bad(ex.Message));
            }
        }


        protected IActionResult TryCatch(Action action)
        {
            try
            {
                action();
                return new OkObjectResult(ActionResult.Ok());
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult(ActionResult.Bad(ex.Message));
            }
        }

        protected JsonResult JsonResultTryCatch<T>(Func<T> func) where T : JsonResult
        {
            try
            {
                return func();
            }
            catch (Exception ex)
            {
                return new JsonResult(ActionResult.Bad(ex.Message));
            }
        }

        /// T: ViewModel
        /// R: DTO
        /// func: 增删改的仓储接口方法
        protected IActionResult OnAction<T, R>(T model, Func<R, ActionResult> func) where T : class, new() where R : class, new()
        {
            if (!ModelState.IsValid) return new BadRequestObjectResult(ActionResult.Bad("数据异常"));
            var auditDto = model.MapTo<T, R>();
            var result = func(auditDto);
            if (result.IsSuccess) return new OkObjectResult(result);
            return new BadRequestObjectResult(result);
        }

        /// T: ViewModel
        protected IActionResult OnAction<T>(T model, Func<ActionResult> func) where T : class, new()
        {
            if (!ModelState.IsValid) return new BadRequestObjectResult(ActionResult.Bad("数据异常"));
            var result = func();
            if (result.IsSuccess) return new OkObjectResult(result);
            return new BadRequestObjectResult(result);
        }

        protected IActionResult OnAction<T>(T model, Func<T,ActionResult> func) where T : class, new()
        {
            if (!ModelState.IsValid) return new BadRequestObjectResult(ActionResult.Bad("数据异常"));
            var result = func(model);
            if (result.IsSuccess) return new OkObjectResult(result);
            return new BadRequestObjectResult(result);
        }
    }
}