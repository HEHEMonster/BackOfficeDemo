using System;
using System.Collections.Generic;

namespace ZDBACKOFFICE.Entity.Models
{
    public partial class SystemVersion
    {
        public int Id { get; set; }
        public string Version { get; set; }
        public string VersionInfo { get; set; }
        public string VersionUrl { get; set; }
        public DateTime CreateDate { get; set; }
        public string DownLoadUrl { get; set; }
        public int IsNecessary { get; set; }
    }
}
