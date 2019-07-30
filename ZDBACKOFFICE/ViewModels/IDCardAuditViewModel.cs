using System;
using System.ComponentModel.DataAnnotations;

namespace ZDBACKOFFICE.Web.ViewModels
{
    public class IDCardAuditViewModal
    {
        [Required]
        public Guid UserID { get; set; }
        public string UserName { get; set; }
        public int Gender { get; set; }
        public string Nation { get; set; }
        public DateTime Birthday { get; set; }
        public string Address { get; set; }
        public string IdCardNbr { get; set; }
        public string IssuingAgency { get; set; }
        public DateTime ValidityStartTime { get; set; }
        public DateTime ValidityEndTime { get; set; }
        [Required]
        public int Status { get; set; }
        public string Remark { get; set; }
    }
}