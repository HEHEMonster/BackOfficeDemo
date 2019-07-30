using System;
using System.Collections.Generic;

namespace ZDBACKOFFICE.Core
{
    using ZDBACKOFFICE.Entity.Models;
       
    public class UserFeedBackList
    {
        public Guid UserID{ get; set; }
        public string UserName { get; set; }
        public int ReportID { get; set; }
        public string SourceType { get; set; }
        public string ReportType { get; set; }
        public string Contact { get; set; }
        public string Photos { get; set; }
        public string SourceID { get; set; }
        public Guid ReportUserID { get; set; }
        public string ReportUserName{ get; set; }
        public string Reason { get; set; }
        public DateTime CreateDate { get; set; }

        public class Criteria : Criteria<UserReport>
        {
            public string SourceType { get; set; }
            public string ReportType { get; set; }
            public string ReportUserName{ get; set; }
            public DateTime? StartDate{ get; set; }
            public DateTime? EndDate{ get; set; }
            protected override void OnCollect(ICriteriaPool<UserReport> pool)
            {
                pool.Add(x => x.ReportUser.UserName == ReportUserName, !string.IsNullOrEmpty(ReportUserName))
                    .Add(x => x.SourceType == ((int)ZDBACKOFFICE.SourceType.Chat).ToString())   //SourceType.FeedBack
                    .Add(x => x.ReportType == ((int)ZDBACKOFFICE.ReportType.Other).ToString()) //ReportType.FeedBack                    
                    .Add(x => x.CreateDate >= StartDate && x.CreateDate <= Convert.ToDateTime(EndDate).AddDays(1));
            }
        }
    }
    public class CreateFeedBackDto
        {
            public string Name{ get; set; }
            public string Contact { get; set; }
            public DateTime? CreateDate { get; set; }
            public string Reason { get; set; }
            public string Photos { get; set; }
            public int SourceType { get; set;}
            public int ReportType{ get; set; }
        }
}