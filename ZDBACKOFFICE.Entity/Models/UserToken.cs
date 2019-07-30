using System;
using System.Collections.Generic;

namespace ZDBACKOFFICE.Entity.Models
{
    public partial class UserToken
    {
        public string Token { get; set; }
        public Guid UserId { get; set; }
        public DateTime CreatDate { get; set; }
        public DateTime ExpiredDate { get; set; }
    }
}
