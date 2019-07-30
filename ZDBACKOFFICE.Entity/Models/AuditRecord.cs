using System;

namespace ZDBACKOFFICE.Entity.Models
{
    public partial class AuditRecord
    {
        public int Id { get; set; }
        public int AuditType { get; set; }
        public string AuditId { get; set; }
        public DateTime AuditDate { get; set; }
        public string AuditorId { get; set; }
        public int PreStatus { get; set; }
        public int ToStatus { get; set; }
        public string Remark { get; set; }

        public SystemOperator Operator { get; set; }
    }
}
