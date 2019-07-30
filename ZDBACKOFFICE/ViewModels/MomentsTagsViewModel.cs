using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace ZDBACKOFFICE.Web.ViewModels
{
    public class MomentsTagsViewModel
    {
        [Required]
        public string ID { get; set; }
        [Required]
        public IEnumerable<string> Tags { get; set; }
    }

    public class MomentsTagViewModel
    {
        [Required(ErrorMessage = "标题为空")]
        public string Title { get; set; }

        [Required(ErrorMessage = "内容为空")]
        public string Content { get; set; }
    }
}