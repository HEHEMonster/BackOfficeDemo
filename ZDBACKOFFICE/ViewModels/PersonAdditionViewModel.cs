using System;
using System.ComponentModel.DataAnnotations;

namespace ZDBACKOFFICE.Web.ViewModels
{
    public class PersonAdditionViewModel
    {
        [Required]
        public string Person { get; set; }
        [Required]
        public string Company { get; set; }
        [Required]
        public string Position { get; set; }
        [Required]
        public string Industry { get; set; }
        [Required]
        public string Region { get; set; }
        [Required]
        public string Address { get; set; }
        [Required]
        public string Telphone { get; set; }
        public int Status { get; set; }
        public string Remark { get; set; }
        [Required]
        public int IsContact { get; set; }
        [Required]
        public int ContactedState { get; set; }
        public DateTime CreateDate { get; set; }

    }

    public class PersonAuditViewModel : PersonAdditionViewModel
    {
        [Required]
        public int ID { get; set; }
        [Required]
        public string OperatorId { get; set; }
    }
}