using System;
using System.Collections.Generic;

namespace ZDBACKOFFICE.Core
{
    using Entity = ZDBACKOFFICE.Entity.Models;
    partial class Audit
    {
        public class UserProduct
        {
            public Guid ID { get; set; }
            public Guid RowId { get; set; }
            public Guid UserID { get; set; }
            public decimal UnitPrice { get; set; }
            public string UserName { get; set; }
            public string Content { get; set; }
            public string Title { get; set; }
            public string Cover { get; set; }
            public string Tags { get; set; }
            public DateTime CreateDate { get; set; }
            public int ViewCount { get; set; }
            public int CollectCount { get; set; }
            public int Status { get; set; }
            public string Remark{ get; set; }
            public string Telphone { get; set; }
            public string Auditor { get; set; }
            public DateTime? AuditDate { get; set; }

            public class Criteria : Criteria<Entity.UserProduct>
            {
                public string UserName { get; set; }
                public DateTime? StartDate { get; set; }
                public DateTime? EndDate { get; set; }
                public int Status { get; set; }
                public string Telphone { get; set; }
                public DateTime? AuditStartDate { get; set; }
                public DateTime? AuditEndDate { get; set; }
                public string Auditor { get; set;}
                protected override void OnCollect(ICriteriaPool<Entity.UserProduct> pool)
                {
                    pool.Add(x => x.User.UserName == UserName, !string.IsNullOrEmpty(UserName))
                        .Add(x => x.User.Telphone == Telphone, !string.IsNullOrEmpty(Telphone))
                        .Add(x => x.Status == Status, Status != (int)AuditStatus.All)
                        .Add(x => x.CreateDate >= StartDate && x.CreateDate <= Convert.ToDateTime(EndDate).AddDays(1));
                }
            }
        }

        public class UserProductAuditDto
        {
            public Guid ID { get; set; }
            public int Status { get; set; }
            public string AuditRemark { get; set; }
            public string ProductRemark { get; set; }
            public List<string> Tags { get; set; }
        }
    }
}
