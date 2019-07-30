using System;
using System.Collections.Generic;

namespace ZDBACKOFFICE.Entity.Models
{
    public partial class SystemRoles
    {
        public SystemRoles()
        {
            SystemAuthorization = new HashSet<SystemAuthorization>();
            SystemOperatorRole = new HashSet<SystemOperatorRole>();
        }

        public int RoleId { get; set; }
        public string RoleName { get; set; }
        public string Description { get; set; }
        public int Status { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime? UpdateDate { get; set; }

        public ICollection<SystemAuthorization> SystemAuthorization { get; set; }
        public ICollection<SystemOperatorRole> SystemOperatorRole { get; set; }
    }
}
