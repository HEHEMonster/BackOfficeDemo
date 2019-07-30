using System.ComponentModel.DataAnnotations;

namespace ZDBACKOFFICE.Web.ViewModels
{
    public class UserCareerAuditViewModel
    {
        [Required]
        public int ID { get; set; }
        [Required]
        public int Status { get; set; }
        public string Remark { get; set; }
        public int CareerType { get; set; }
    }
}