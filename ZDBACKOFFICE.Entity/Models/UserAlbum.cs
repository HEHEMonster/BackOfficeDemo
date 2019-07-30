using System;
using System.Collections.Generic;

namespace ZDBACKOFFICE.Entity.Models
{
    public partial class UserAlbum
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public string Photo { get; set; }
        public DateTime CreateDate { get; set; }
        public string Remark { get; set; }

        public UserInfo User { get; set; }
    }
}
