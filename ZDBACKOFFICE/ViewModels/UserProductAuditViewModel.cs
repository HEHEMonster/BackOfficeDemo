using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ZDBACKOFFICE.Web.ViewModels
{
    public class UserProductAuditViewModel
    {
        [Required]
        public Guid ID { get; set; }
        [Required]
        public int Status { get; set; }
        public string AuditRemark { get; set; }
        public List<string> Tags { get; set; }
    }
}