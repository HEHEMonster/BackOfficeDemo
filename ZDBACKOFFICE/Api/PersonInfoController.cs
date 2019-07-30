using System;
using IO = System.IO;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Authorization;

namespace ZDBACKOFFICE.Web.Controllers
{
    using Newtonsoft.Json;
    using ZDBACKOFFICE.Core;
    using ZDBACKOFFICE.Utils;
    using ZDBACKOFFICE.Web.ViewModels;
    using ZDBACKOFFICE.Web.Authorization;
    using static ZDBACKOFFICE.Permission;

    [Route("api/personInfo")]
    [Permission(PersonAudit)]
    public class PersonInfoController : BaseController
    {
        private readonly IPersonInfoRepo _personInfoRepo;

        public PersonInfoController(IPersonInfoRepo personInfoRepo)
        {
            _personInfoRepo = personInfoRepo;
        }

        [HttpGet("list")]
        public IActionResult GetUserReportList(Audit.PersonInfo.Criteria criteria)
            => TryCatch(() => criteria.PageOf(x => _personInfoRepo.GetPersonInfoList(criteria)));

        [HttpPost("add")]
        public IActionResult AddPerson([FromBody]PersonAdditionViewModel model)
            => TryCatch(() => OnAction<PersonAdditionViewModel, Audit.PersonAddition>(model, _personInfoRepo.AddPersonInfo));

        [HttpPost("export")]
        public IActionResult ExportUserIDCardList([FromBody]Audit.PersonInfo.Criteria criteria)
            => TryCatch(() => File(_personInfoRepo.GetPersonInfoList(criteria.SetMaxPageSize()).ToExcel(ExportMappings.PersonExportConfig), "application/vnd.ms-excel"));

        [HttpPut("audit")]
        public IActionResult AuditPerson([FromBody]PersonAuditViewModel model)
            => TryCatch(() => OnAction<PersonAuditViewModel, Audit.PersonAuditDto>(model, _personInfoRepo.AuditPersonInfo));

        [HttpPost("import")]
        public IActionResult Import([FromServices]IHostingEnvironment env, IFormFile file)
            => TryCatch(() =>
            {
                var url = SaveFileReturnUrl(env.WebRootPath, file);
                var infos = PersonInfoImportConverter.ToImportList(url);
                var result = _personInfoRepo.ImportPersonInfo(infos);
                IO.File.Delete(url);
                return Ok();
            });

        private string SaveFileReturnUrl(string webRootPath, IFormFile file)
        {
            var fileName = IO.Path.Combine("upload", DateTime.Now.ToString("MMddHHmmss"));
            var filePath = IO.Path.Combine(webRootPath, fileName);
            using (var stream = new IO.FileStream(filePath, IO.FileMode.CreateNew))
            {
                file.CopyTo(stream);
            }
            return filePath;
        }

        #region 操作城市json数据
        // [AllowAnonymous]
        // [HttpGet("citys")]
        // public IActionResult CityData([FromServices]IHostingEnvironment env)
        //     => TryCatch(() =>
        //     {
        //         var filePath = IO.Path.Combine(env.WebRootPath, "/upload/city.json");
        //         List<City> citys=JsonConvert.DeserializeObject<List<City>>(IO.File.ReadAllText(filePath));
        //         return Json(citys);
        //     });

        // public class City
        // {
        //     public string label { get; set; }
        //     public string value { get; set; }
        //     public List<Children> children { get; set; }
        // }

        // public class Children
        // {
        //     public string label { get; set; }
        //     public string value { get; set; }
        // }
        #endregion
    }
}