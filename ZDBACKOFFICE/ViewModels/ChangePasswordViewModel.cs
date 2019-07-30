using System.ComponentModel.DataAnnotations;

namespace ZDBACKOFFICE.Web.ViewModels
{
    public class ChangePasswordViewModel
    {   
        [Required(ErrorMessage = "密码不能为空")]
        public string Password { get; set; }

        [Required(ErrorMessage = "请输入新密码")]
        public string FirstPassword{ get; set; }

        [Required(ErrorMessage = "请再次输入新密码")]
        public string LastPassword { get; set; }

    }
}
