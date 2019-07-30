using System;
using System.Collections.Generic;

namespace ZDBACKOFFICE.Entity.Models
{
    public partial class UserThirdBind
    {
        public Guid UserId { get; set; }
        public int PlatformType { get; set; }
        public string PlatformId { get; set; }
        public DateTime CreateDate { get; set; }
    }
}
