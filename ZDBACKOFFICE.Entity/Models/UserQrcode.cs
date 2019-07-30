using System;
using System.Collections.Generic;

namespace ZDBACKOFFICE.Entity.Models
{
    public partial class UserQrcode
    {
        public int Id { get; set; }
        public int Type { get; set; }
        public Guid UserId { get; set; }
        public string ActionUserId { get; set; }
        public string Remark { get; set; }
        public int Status { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime UpdateDate { get; set; }
    }
}
