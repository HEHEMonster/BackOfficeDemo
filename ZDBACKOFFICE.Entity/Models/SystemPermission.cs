using System;
using System.Collections.Generic;

namespace ZDBACKOFFICE.Entity.Models
{
    public partial class SystemPermission
    {
        public SystemPermission()
        {
            SystemAuthorization = new HashSet<SystemAuthorization>();
        }

        public int Id { get; set; }
        public string PermissionName { get; set; }
        public int? Status { get; set; }

        public ICollection<SystemAuthorization> SystemAuthorization { get; set; }
    }
}
