using ZDBACKOFFICE.Core;

namespace ZDBACKOFFICE.Utils
{
    public static class ExportMappings
    {
        public static void UserIDCardExportConfig(ExcelConfig<Audit.UserIDCard> config)
            => config.Map(x => x.UserName, "用户名")
                .Map(x => x.IdCardNumber, "身份证卡号")
                .Map(x => x.Phone, "电话号码")
                .Map(x => x.CreateTime, "上传时间")
                .Map(x => x.UpdateTime, "更新时间")
                .Map(x => x.Status, "状态")
                .Map(x => x.Auditor, "审核人")
                .Map(x => x.AuditDate, "审核时间");

        public static void UserCareerExportConfig(ExcelConfig<Audit.UserCareers> config)
            =>config.Map(x => x.UserName, "用户名")
                    .Map(x => x.Company, "公司名")
                    .Map(x => x.CompanyTel, "公司电话")
                    .Map(x => x.CareerType, "提交身份")
                    .Map(x => x.CreateDate, "提交时间")
                    .Map(x => x.Status, "状态");

        public static void PersonExportConfig(ExcelConfig<Audit.PersonInfo> config)
            =>config.Map(x => x.Person, "姓名")
                    .Map(x => x.Telphone, "电话")
                    .Map(x => x.Region, "区域")
                    .Map(x => x.Industry, "行业")
                    .Map(x => x.Company, "公司名")
                    .Map(x => x.Position, "职位")
                    .Map(x => x.Address, "公司地址")
                    .Map(x => x.Operator, "录入人")
                    .Map(x => x.CreateDate, "录入时间")
                    .Map(x => x.IsContact, "联系状态")
                    .Map(x => x.ContactedState, "联系后状态")
                    .Map(x => x.Remark, "备注");
    }
}