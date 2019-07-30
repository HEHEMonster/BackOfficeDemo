using System;
using System.Collections.Generic;

namespace ZDBACKOFFICE.Entity.Models
{
    public partial class UserGroup
    {
        public int Id { get; set; }
        public Guid UserId { get; set; }
        public Guid GroupId { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime UpdateDate { get; set; }
        public int Status { get; set; }

        public UserInfo User { get; set; }
    }
}
