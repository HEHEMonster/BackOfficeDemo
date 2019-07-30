using System;
using System.Collections.Generic;

namespace ZDBACKOFFICE.Entity.Models
{
    public partial class UserBlock
    {
        public int Id { get; set; }
        public Guid UserId { get; set; }
        public Guid BlockId { get; set; }
        public int Type { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime UpdateDate { get; set; }

        public UserInfo Block { get; set; }
        public UserInfo User { get; set; }
    }
}
