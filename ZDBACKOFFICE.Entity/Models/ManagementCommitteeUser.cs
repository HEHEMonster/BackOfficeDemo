using System;
using System.Collections.Generic;

namespace ZDBACKOFFICE.Entity.Models
{
    public partial class ManagementCommitteeUser
    {
        public string VipId { get; set; }
        public Guid UserId { get; set; }
        public int Type { get; set; }
        public string Region { get; set; }
        public string Title { get; set; }
        public int Exp { get; set; }
        public int Invites { get; set; }
        public int Income { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime UpdateDate { get; set; }

        public UserInfo User { get; set; }
    }
}
