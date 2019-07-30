using System;
using System.Linq;
using System.Collections.Generic;
using NPOI.SS.UserModel;

namespace ZDBACKOFFICE.Utils
{
    using ZDBACKOFFICE.Core;

    public static class PersonInfoImportConverter
    {

        public static List<Audit.PersonInfo> ToImportList(string filePath)
            => ExcelImportHelper.ConvertExcel(filePath, ToPersonInfo, 1).ToList();

        private static Audit.PersonInfo ToPersonInfo(IRow row)
        {
            if (string.IsNullOrEmpty(row.GetCell(0)?.ToString())) return null;
            return new Audit.PersonInfo
            {
                Person = row.GetCell("姓名"),
                Telphone = row.GetCell("电话"),
                Region = row.GetCell("区域"),
                Industry = row.GetCell("行业"),
                Position = row.GetCell("职位"),
                Company = row.GetCell("公司名"),
                Address = row.GetCell("公司名"),
                ContactedState = int.Parse(row.GetCell("联系后状态") ?? "0"),
                IsContact = int.Parse(row.GetCell("联系状态") ?? "0"),
                Remark = row.GetCell("备注"),
                CreateDate = DateTime.Now,
                Status = 0,
                UpdateDate = null
            };
        }
    }
}
