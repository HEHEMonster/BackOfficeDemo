using System;
using System.Collections.Generic;

namespace ZDBACKOFFICE.Entity.Models
{
    public partial class SystemOperatorRole
    {
        public int Id { get; set; }
        public string Operator { get; set; }
        public int? Role { get; set; }

        public SystemOperator OperatorNavigation { get; set; }
        public SystemRoles RoleNavigation { get; set; }
    }
}
