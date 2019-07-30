using System;
using System.Collections.Generic;

namespace ZDBACKOFFICE.Entity.Models
{
    public partial class SystemAuthorization
    {
        public int Id { get; set; }
        public int RoleId { get; set; }
        public int PermissionId { get; set; }
        public int? Status { get; set; }

        public SystemPermission Permission { get; set; }
        public SystemRoles Role { get; set; }
    }
}
