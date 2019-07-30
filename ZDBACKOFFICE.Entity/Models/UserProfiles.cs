using System;
using System.Collections.Generic;

namespace ZDBACKOFFICE.Entity.Models
{
    public partial class UserProfiles
    {
        public Guid UserId { get; set; }
        public int NotificationPush { get; set; }
        public int NotificationDetail { get; set; }
        public int Vebrator { get; set; }
        public int SendCardConfirm { get; set; }
        public int MomentScope { get; set; }
        public int Contacts { get; set; }
        public int IsExpression { get; set; }
        public string Properties { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime UpdateDate { get; set; }

        public UserInfo User { get; set; }
    }
}
