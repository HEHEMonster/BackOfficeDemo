using System;

namespace ZDBACKOFFICE.Core
{
    using ZDBACKOFFICE;
    using ZDBACKOFFICE.Entity.Models;

    partial class Audit
    {
        public class UserCareers
        {
            public int Id { get; set; }
            public Guid RowId { get; set; }
            public Guid UserID { get; set; }

            public int CareerType { get; set; }
            public int Status { get; set; }

            public string UserName { get; set; }
            public string NickName { get; set; }
            public string Company { get; set; }
            public string Position { get; set; }
            public string CompanyTel { get; set; }
            public string CardUrl { get; set; }
            public string Auditor { get; set; }
            public string Telphone { get; set; }
            public DateTime? UpdateDate { get; set; }
            public DateTime? CreateDate { get; set; }
            public DateTime? AuditDate { get; set; }
            public int Count { get; set; }
            public int? ConfirmCareerType { get; set; }

            public class Criteria : Criteria<UserCareer>
            {
                public string UserName { get; set; }
                public string NickName { get; set; }
                public int CareerType { get; set; }
                public DateTime? StartDate { get; set; }
                public DateTime? EndDate { get; set; }
                public int Status { get; set; }
                public string Auditor { get; set; }
                public string Telphone { get; set; }
                protected override void OnCollect(ICriteriaPool<UserCareer> pool)
                {
                    pool.Add(x => x.User.UserName == UserName, !string.IsNullOrEmpty(UserName))
                        .Add(x => x.User.Telphone == UserName, !string.IsNullOrEmpty(Telphone))
                        .Add(x => x.Status == Status, Status != (int)AuditStatus.All)
                        .Add(x => x.CareerType == CareerType, CareerType > (int)ZDBACKOFFICE.CareerType.Nil)
                        .Add(x => x.CareerType != (int)ZDBACKOFFICE.CareerType.Nil && x.CareerType != (int)ZDBACKOFFICE.CareerType.Selfemployed)
                        .Add(x => x.UpdateDate >= StartDate && x.UpdateDate <= Convert.ToDateTime(EndDate).AddDays(1));
                }

                public Criteria SetMaxPagSize()
                {
                    PageSize = int.MaxValue; return this;
                }
            }
        }

        public class UserCareerAuditDto
        {
            public int ID { get; set; }
            public int Status { get; set; }
            public string Remark { get; set; }
            public int CareerType { get; set; }
        }

    }
}
