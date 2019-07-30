using System;

namespace ZDBACKOFFICE.Core
{
    using M = ZDBACKOFFICE.Entity.Models;
    partial class Audit
    {
        public class UserReport
        {
            public int ReportId { get; set; }
            public Guid UserId { get; set; }
            public string UserName { get; set; }
            public string SourceType { get; set; }
            public string ReportType { get; set; }
            public string ProcessingResults { get; set; }
            public string Contact { get; set; }
            public string Photos { get; set; }
            public string SourceId { get; set; }
            public int Status { get; set; }
            public Guid? ReportUserId { get; set; }
            public string ReportUserName { get; set; }
            public string Reason { get; set; }
            public DateTime? CreateDate { get; set; }
            public DateTime? UpdateDate { get; set; }

            public class Criteria : Criteria<M.UserReport>
            {
                public int SourceType { get; set; }
                public int ReportType { get; set; }
                public DateTime? StartDate { get; set; }
                public DateTime? EndDate { get; set; }
                public int Status { get; set; }  //0 未处理 1已处理

                protected override void OnCollect(ICriteriaPool<M.UserReport> pool)
                {
                    pool.Add(x => x.Status == Status, Status > -1)
                        .Add(x => x.SourceType == SourceType.ToString(), SourceType > (int)ZDBACKOFFICE.SourceType.All)
                        .Add(x => x.ReportType == ReportType.ToString(), ReportType > (int)ZDBACKOFFICE.ReportType.All)
                        .Add(x => x.UpdateDate >= StartDate && x.UpdateDate <= Convert.ToDateTime(EndDate).AddDays(1))
                        .Add(x => x.SourceType != ZDBACKOFFICE.SourceType.FeedBack.ToString())
                        .Add(x => x.ReportType != ZDBACKOFFICE.ReportType.FeedBack.ToString());
                }
            }
        }
    }
}