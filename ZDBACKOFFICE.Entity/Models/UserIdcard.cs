using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace ZDBACKOFFICE.Entity.Models
{
    public partial class UserIdcard
    {
        public Guid UserId { get; set; }
        public string IdcardFrontUrl { get; set; }
        public string IdcardBackUrl { get; set; }
        public string UserName { get; set; }
        public int? Gender { get; set; }
        public string Nation { get; set; }
        public DateTime? Birthday { get; set; }
        public string Address { get; set; }
        public string IdcardNo { get; set; }
        public string IssuingAgency { get; set; }
        public DateTime? ValidityStartTime { get; set; }
        public DateTime? ValidityEndTime { get; set; }
        public int? Status { get; set; }
        public DateTime? CreateTime { get; set; }
        public DateTime? UpdateTime { get; set; }
        public string Remark { get; set; }

        [ForeignKey("UserId")]
        public UserInfo User { get; set; }
    }
}
