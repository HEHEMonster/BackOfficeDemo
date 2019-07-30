using System;
using System.Collections.Generic;

namespace ZDBACKOFFICE.Entity.Models
{
    public partial class UserReport
    {
        public int ReportId { get; set; }
        public Guid UserId { get; set; }
        public string SourceType { get; set; }
        public string ReportType { get; set; }
        public string ProcessingResults { get; set; }
        public string Contact { get; set; }
        public string Photos { get; set; }
        public string SourceId { get; set; }
        public int Status { get; set; }
        public Guid? ReportUserId { get; set; }
        public string Reason { get; set; }
        public DateTime? CreateDate { get; set; }
        public DateTime? UpdateDate { get; set; }

        public UserInfo User { get; set; }
        public UserInfo ReportUser { get; set; }
    }
}
