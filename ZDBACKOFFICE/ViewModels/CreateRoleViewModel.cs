using System.ComponentModel.DataAnnotations;

namespace ZDBACKOFFICE.Web.ViewModels
{
    public class CreateRoleViewModel
    {
        [Required]
        public int ID { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        public int Status { get; set; }
    }
}
