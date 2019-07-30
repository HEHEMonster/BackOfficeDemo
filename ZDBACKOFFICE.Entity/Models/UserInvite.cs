using System;
using System.Collections.Generic;

namespace ZDBACKOFFICE.Entity.Models
{
    public partial class UserInvite
    {
        public int Id { get; set; }
        public Guid UserId { get; set; }
        public string InviteTelphone { get; set; }
        public string InviteCode { get; set; }
        public int Status { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime UpdateDate { get; set; }

        public UserInfo User { get; set; }
    }
}
