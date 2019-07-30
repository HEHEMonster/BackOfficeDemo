using System;
using System.Collections.Generic;

namespace ZDBACKOFFICE.Entity.Models
{
    public partial class YimToken
    {
        public Guid UserId { get; set; }
        public string Imtoken { get; set; }
        public DateTime CreateDate { get; set; }

        public UserInfo User { get; set; }
    }
}
