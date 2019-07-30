using System.ComponentModel.DataAnnotations;

namespace ZDBACKOFFICE.Web.ViewModels
{
    public class ProductTagViewModel
    {   
        [Required(ErrorMessage="产品标题为空")]
        public string Title { get; set; }

        [Required(ErrorMessage="产品内容为空")]
        public string Content { get; set; }
    }
}
