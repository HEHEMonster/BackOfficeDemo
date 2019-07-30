using System;
using System.ComponentModel.DataAnnotations;

namespace ZDBACKOFFICE.Web.ViewModels
{
    public class CreateFeedBackViewModel
    {
       [Required]
        public int ID{ get; set; }
        public string Name{ get; set; }
        public string Contact{ get; set; }
        public DateTime? CreateDate{ get; set; }
        public string Reason{ get; set; }
        public string Photo{ get; set; }
        public int SourceType { get; set;}
        public int ReportType{ get; set; }
    }
}