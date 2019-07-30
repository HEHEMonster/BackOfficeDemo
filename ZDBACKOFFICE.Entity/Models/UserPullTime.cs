using System;
using System.Collections.Generic;

namespace ZDBACKOFFICE.Entity.Models
{
    public partial class UserPullTime
    {
        public Guid UserId { get; set; }
        public int Type { get; set; }
        public DateTime PullDate { get; set; }

        public UserInfo User { get; set; }
    }
}
