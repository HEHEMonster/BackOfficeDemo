using System;
using System.Collections.Generic;

namespace ZDBACKOFFICE.Entity.Models
{
    public partial class UserVipInvite
    {
        public int Id { get; set; }
        public string InviteUserId { get; set; }
        public string UserId { get; set; }
        public string OrderId { get; set; }
        public int Type { get; set; }
        public int Status { get; set; }
        public string Remark { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime UpdateDate { get; set; }
    }
}
