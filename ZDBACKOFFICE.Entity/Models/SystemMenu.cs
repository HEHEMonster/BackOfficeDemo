using System;
using System.Collections.Generic;

namespace ZDBACKOFFICE.Entity.Models
{
    public partial class SystemMenu
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Url { get; set; }
        public int RoleId { get; set; }
        public int RootId { get; set; }

        public SystemRoles Role { get; set; }
    }
}
