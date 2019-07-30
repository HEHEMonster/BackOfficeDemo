using System;
using System.Collections.Generic;

namespace ZDBACKOFFICE.Entity.Models
{
    public partial class ScheduleInfo
    {
        public int Id { get; set; }
        public string JobGroup { get; set; }
        public string JobName { get; set; }
        public int RunStatus { get; set; }
        public string CromExpress { get; set; }
        public DateTime? StarRunTime { get; set; }
        public DateTime? EndRunTime { get; set; }
        public DateTime? NextRunTime { get; set; }
        public string Token { get; set; }
        public string AppId { get; set; }
        public string ServiceCode { get; set; }
        public string InterfaceCode { get; set; }
        public string TaskDescription { get; set; }
        public int? DataStatus { get; set; }
        public string CreateAuthr { get; set; }
        public DateTime? CreateTime { get; set; }
    }
}
