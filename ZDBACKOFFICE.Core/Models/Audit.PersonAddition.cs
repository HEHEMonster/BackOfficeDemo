using System;

namespace ZDBACKOFFICE.Core
{
    partial class Audit
    {
        public class PersonAddition
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
            public DateTime UpdateDate { get; set; }
            public string OperatorId { get; set; }
            public string Operator { get; set; }
            public int IsContact { get; set; }
            public int ContactedState { get; set; }
        }

        public class PersonAuditDto : PersonAddition { }
    }
}