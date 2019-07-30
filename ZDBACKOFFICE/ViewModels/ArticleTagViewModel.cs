using System.ComponentModel.DataAnnotations;

namespace ZDBACKOFFICE.Web.ViewModels
{
    public class ArticleTagViewModel
    {   
        [Required(ErrorMessage="文章标题为空")]
        public string Title { get; set; }

        [Required(ErrorMessage="文章内容为空")]
        public string Content { get; set; }
    }
}
