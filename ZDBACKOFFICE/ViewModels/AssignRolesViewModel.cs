using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ZDBACKOFFICE.Web.ViewModels
{
    public class AssignRolesViewModel
    {   
        [Required]
        public string OperatorID { get; set; }

        [Required]
        public List<int> RoleIDs { get; set; }
    }
}
