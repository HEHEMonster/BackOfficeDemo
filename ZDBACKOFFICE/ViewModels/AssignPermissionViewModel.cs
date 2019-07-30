using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ZDBACKOFFICE.Web.ViewModels
{
    public class AssignPermissionViewModel
    {
        [Required]
        public int RoleID { get; set; }

        [Required]
        public IEnumerable<int> PermissionIDs { get; set; }
    }
}
