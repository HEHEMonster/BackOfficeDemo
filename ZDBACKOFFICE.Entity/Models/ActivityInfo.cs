using System;
using System.Collections.Generic;

namespace ZDBACKOFFICE.Entity.Models
{
    public partial class ActivityInfo
    {
        public ActivityInfo()
        {
            ActivityGuests = new HashSet<ActivityGuests>();
            ActivityJoinRecord = new HashSet<ActivityJoinRecord>();
        }

        public int ActivityId { get; set; }
        public string Title { get; set; }
        public int Type { get; set; }
        public decimal UnitPrice { get; set; }
        public int Places { get; set; }
        public int Attendance { get; set; }
        public string CoverPhoto { get; set; }
        public string Address { get; set; }
        public string Images { get; set; }
        public string Description { get; set; }
        public string Content { get; set; }
        public DateTime RegistrationBegin { get; set; }
        public DateTime RegistrationEnd { get; set; }
        public DateTime BeginDate { get; set; }
        public DateTime EndDate { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime UpdateDate { get; set; }
        public int Status { get; set; }
        public string AddressDetail { get; set; }

        public ICollection<ActivityGuests> ActivityGuests { get; set; }
        public ICollection<ActivityJoinRecord> ActivityJoinRecord { get; set; }
    }
}
