using System;
using System.IO;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace ZDBACKOFFICE.Web.Controllers
{
    using ZDBACKOFFICE.Web.Utils;

    [Route("api/QiNiuYun")]
    public class QiNiuYunController : BaseController
    {

        private readonly QiNiuYunHelper qny;

        public QiNiuYunController(IOptions<QiNiuYunConfig> config)
        {
            qny = new QiNiuYunHelper(config);
        }

        [HttpPost("Posts")]
        public object Posts()
        {
            if (HttpContext.Request.Form.Files != null && HttpContext.Request.Form.Files.Count > 0)
            {
                string fullname = HttpContext.Request.Form.Files.First().FileName;
                string extension = Path.GetExtension( fullname);//扩展名 
                Stream stream = HttpContext.Request.Form.Files.First().OpenReadStream();
                return qny.UploadFile(stream, Guid.NewGuid().ToString() + extension);
            }
            //上传失败的默认图片
            return new { text = new { url = "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" } };
        }

    }
}
