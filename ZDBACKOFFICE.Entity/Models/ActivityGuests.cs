using System;
using System.Collections.Generic;

namespace ZDBACKOFFICE.Entity.Models
{
    public partial class ActivityGuests
    {
        public int ActivityId { get; set; }
        public Guid UserId { get; set; }
        public int Status { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime UpdateDate { get; set; }

        public ActivityInfo Activity { get; set; }
        public UserInfo User { get; set; }
    }
}
