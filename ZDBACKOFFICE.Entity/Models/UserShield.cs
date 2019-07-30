using System;
using System.Collections.Generic;

namespace ZDBACKOFFICE.Entity.Models
{
    public partial class UserShield
    {
        public int Id { get; set; }
        public int Type { get; set; }
        public int OpType { get; set; }
        public Guid UserId { get; set; }
        public string ShieldId { get; set; }
        public int Status { get; set; }
        public string Remark { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime UpdateDate { get; set; }
    }
}
