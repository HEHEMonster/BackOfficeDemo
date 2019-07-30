using System;
using System.Collections.Generic;

namespace ZDBACKOFFICE.Entity.Models
{
    public partial class SystemOperator
    {
        public SystemOperator()
        {
            SystemOperatorRole = new HashSet<SystemOperatorRole>();
        }

        public string OperatorId { get; set; }
        public string Name { get; set; }
        public int Status { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime UpdateDate { get; set; }
        public string Password { get; set; }

        public ICollection<SystemOperatorRole> SystemOperatorRole { get; set; }

        public ICollection<AuditRecord> AuditRecords { get; set; }
    }
}
