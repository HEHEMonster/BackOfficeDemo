using System;

namespace ZDBACKOFFICE.Core
{
    using ZDBACKOFFICE;
    using ZDBACKOFFICE.Entity.Models;
    partial class Audit
    {
        public class Activity
        {

            public int ActivityId { get; set; }
            public string Title { get; set; }
            public int Type { get; set; }
            public string TypeText
            {
                get
                {
                    if (Type == 1) return "线下沙龙";
                    if (Type == 2) return "线上报名";
                    return "线下沙龙";
                }

                set
                {
                    if (value == "线下沙龙") Type = 1;
                    if (value == "线上报名") Type = 2;
                }
            }
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

            //public ICollection<ActivityGuests> ActivityGuests { get; set; }
            //public ICollection<ActivityJoinRecord> ActivityJoinRecord { get; set; }

            public class Criteria : Criteria<ActivityInfo>
            {
                public string Title { get; set; }
                public int Type { get; set; }
                public int Status { get; set; }
                public DateTime? CreateDate_start { get; set; }
                public DateTime? CreateDate_end { get; set; }
                public DateTime? BeginDate { get; set; }
                public DateTime? EndDate { get; set; }
                public DateTime? RegistrationBegin { get; set; }
                public DateTime? RegistrationEnd { get; set; }

                protected override void OnCollect(ICriteriaPool<ActivityInfo> pool)
                {
                    pool.Add(x => x.Title.Contains(Title), !string.IsNullOrEmpty(Title))
                        .Add(x => x.Type == Type, Type != ActivityType.All.ToValue())
                        .Add(x => x.Status == Status, Status != ActivityStatus.All.ToValue())
                        .Add(x => x.CreateDate >= CreateDate_start && x.CreateDate <= CreateDate_end)
                        .Add(x => (x.BeginDate <= BeginDate && x.EndDate >= BeginDate) || (x.BeginDate >= BeginDate && x.BeginDate < EndDate))
                        .Add(x => (x.RegistrationBegin <= RegistrationBegin && x.RegistrationEnd >= RegistrationBegin) || (x.RegistrationBegin >= RegistrationBegin && x.RegistrationBegin < RegistrationEnd))
                        ;
                }
            }
        }

    }
}
