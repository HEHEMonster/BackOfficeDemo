using System;
using System.Collections.Generic;

namespace ZDBACKOFFICE.Entity.Models
{
    public partial class ManagementCommittee
    {
        public int Id { get; set; }
        public string Region { get; set; }
        public int Chairman { get; set; }
        public int ViceChairman { get; set; }
        public int Director { get; set; }
        public int Member { get; set; }
        public string Address { get; set; }
        public string Telphone { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime Updatetime { get; set; }
    }
}
