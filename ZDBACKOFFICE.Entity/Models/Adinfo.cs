using System;
using System.Collections.Generic;

namespace ZDBACKOFFICE.Entity.Models
{
    public partial class Adinfo
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string CoverUrl { get; set; }
        public string JumpUrl { get; set; }
        public string Remark { get; set; }
        public int Status { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime UpdateDate { get; set; }
    }
}
