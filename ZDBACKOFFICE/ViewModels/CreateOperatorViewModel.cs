using System.ComponentModel.DataAnnotations;

namespace ZDBACKOFFICE.Web.ViewModels
{
    public class CreateOperatorViewModel
    {   
        [Required]
        public string Name { get; set; }
    }
}
