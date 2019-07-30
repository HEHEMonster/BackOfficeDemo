using System;

namespace ZDBACKOFFICE.Core
{
    using Entity = ZDBACKOFFICE.Entity.Models;
    partial class Audit
    {
        public class PersonInfo
        {
            public int Id { get; set; }
            public string Person { get; set; }
            public string Company { get; set; }
            public string Position { get; set; }
            public string Industry { get; set; }
            public string Region { get; set; }
            public string Address { get; set; }
            public string Telphone { get; set; }
            public int Status { get; set; }
            public string Remark { get; set; }
            public DateTime CreateDate { get; set; }
            public DateTime? UpdateDate { get; set; }
            public string OperatorId { get; set; }
            public string Operator { get; set; }
            public int IsContact { get; set; }
            public int ContactedState { get; set; }
            public string Auditor { get; set; }

            public class Criteria : Criteria<Entity.ProspectPerson>
            {
                public string Person { get; set; }
                public string Industry { get; set; }
                public string Region { get; set; }
                public int IsContact { get; set; }
                public string Operator { get; set; }
                public DateTime? StartDate { get; set; }
                public DateTime? EndDate { get; set; }
                public int ContactedState { get; set; }

                public Criteria SetMaxPageSize()
                {
                    PageSize = int.MaxValue; return this;
                }
                protected override void OnCollect(ICriteriaPool<Entity.ProspectPerson> pool)
                {
                    pool.Add(x => x.Person == Person, !string.IsNullOrEmpty(Person))
                    .Add(x => x.Industry == Industry, !string.IsNullOrEmpty(Industry))
                    .Add(x => x.Region == Region, !string.IsNullOrEmpty(Region))
                    .Add(x => x.Operator.Name == Operator, !string.IsNullOrEmpty(Operator))
                    .Add(x => x.IsContact == IsContact, IsContact >= 0)
                    .Add(x => x.ContactedState == ContactedState, ContactedState >= 0)
                    .Add(x => x.CreateDate >= StartDate && x.CreateDate <= Convert.ToDateTime(EndDate).AddDays(1));
                }
            }
        }
    }
}