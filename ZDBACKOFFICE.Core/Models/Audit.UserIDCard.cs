using System;
using System.Linq;
using System.Collections.Generic;

namespace ZDBACKOFFICE.Core
{
    using ZDBACKOFFICE.Entity.Models;
    partial class Audit
    {
        public class UserIDCard
        {
            public Guid ID { get; set; }
            public Guid UserID { get; set; }
            public string UserName { get; set; }
            public int Gender { get; set; }
            public string Nation { get; set; }
            public DateTime? Birthday { get; set; }
            public string Address { get; set; }
            public string IdcardNo { get; set; }
            public string IssuingAgency { get; set; }
            public DateTime? ValidityStartTime { get; set; }
            public DateTime? ValidityEndTime { get; set; }
            public string IdcardFrontUrl { get; set; }
            public string IdcardBackUrl { get; set; }
            public string IdCardNumber { get; set; }
            public DateTime? CreateTime { get; set; }
            public DateTime? UpdateTime { get; set; }
            public int Status { get; set; }

            public string Phone { get; set; }

            public string Auditor { get; set; }
            public DateTime? AuditDate { get; set; }
            //   public ICollection<UserCareer> UserCareer { get; set; }

            public class Criteria : Criteria<UserIdcard>
            {
                public string UserName { get; set; }
                public string IdCardNumber { get; set; }
                public string Telphone { get; set; }
                public string Auditor { get; set; }
                public DateTime? StartDate { get; set; }
                public DateTime? EndDate { get; set; }
                public int Status { get; set; }
                
                public Criteria SetMaxPageSize()
                {
                    PageSize = int.MaxValue; return this;
                }
                protected override void OnCollect(ICriteriaPool<UserIdcard> pool)
                {
                    pool.Add(x => x.IdcardNo == IdCardNumber, !string.IsNullOrEmpty(IdCardNumber))
                        .Add(x => x.Status == Status, Status != AuditStatus.All.ToValue())
                        .Add(x => x.UserName == UserName, !string.IsNullOrEmpty(UserName))
                        .Add(x => x.User.Telphone == Telphone, !string.IsNullOrEmpty(Telphone))
                        .Add(x => x.CreateTime >= StartDate && x.CreateTime <= Convert.ToDateTime(EndDate).AddDays(1));
                }
            }
        }

        public class UserIDCardAuditDto
        {
            public Guid UserID { get; set; }
            public string UserName { get; set; }
            public int Gender { get; set; }
            public string Nation { get; set; }
            public string Address { get; set; }
            public string IdCardNbr { get; set; }
            public string IssuingAgency { get; set; }
            public DateTime? Birthday { get; set; }
            public DateTime? ValidityStartTime { get; set; }
            public DateTime? ValidityEndTime { get; set; }
            public int Status { get; set; }
            public string Remark { get; set; }
        }
    }
}
