using System;
using System.Collections.Generic;

namespace ZDBACKOFFICE.Entity.Models
{
    public partial class DeviceInfo
    {
        public int Id { get; set; }
        public Guid UserId { get; set; }
        public int DeviceType { get; set; }
        public string Model { get; set; }
        public string Uuid { get; set; }
        public string AppVersion { get; set; }
        public string SystemVersion { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime UpdateDate { get; set; }

        public UserInfo User { get; set; }
    }
}
