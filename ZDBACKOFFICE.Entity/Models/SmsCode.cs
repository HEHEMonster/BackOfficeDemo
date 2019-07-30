using System;
using System.Collections.Generic;

namespace ZDBACKOFFICE.Entity.Models
{
    public partial class SmsCode
    {
        public int SeqId { get; set; }
        public string SendNumber { get; set; }
        public string PhoneNumber { get; set; }
        public int Type { get; set; }
        public string Code { get; set; }
        public DateTime CreatDate { get; set; }
        public DateTime ExpiredTime { get; set; }
        public int VerifyFlag { get; set; }
        public DateTime? VerifyTime { get; set; }
    }
}
