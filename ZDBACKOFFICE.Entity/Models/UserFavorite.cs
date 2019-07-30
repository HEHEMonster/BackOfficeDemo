using System;
using System.Collections.Generic;

namespace ZDBACKOFFICE.Entity.Models
{
    public partial class UserFavorite
    {
        public int Id { get; set; }
        public Guid UserId { get; set; }
        public string ObjId { get; set; }
        public int ObjType { get; set; }
        public int Status { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime UpdateDate { get; set; }

        public UserInfo User { get; set; }
    }
}
