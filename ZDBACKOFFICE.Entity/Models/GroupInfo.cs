using System;
using System.Collections.Generic;

namespace ZDBACKOFFICE.Entity.Models
{
    public partial class GroupInfo
    {
        public Guid GroupId { get; set; }
        public string Name { get; set; }
        public Guid Owner { get; set; }
        public int Members { get; set; }
        public string Description { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime UpdateDate { get; set; }
    }
}
