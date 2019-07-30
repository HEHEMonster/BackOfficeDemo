using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ZDBACKOFFICE.Web.ViewModels
{
    public class UserArticleAuditViewModel
    {
        [Required]
        public Guid ID { get; set; }
        [Required]
        public int Status { get; set; }
        public int IsHot { get; set; }
        public string Remark { get; set; }
        public List<string> Tags { get; set; }
    }
}