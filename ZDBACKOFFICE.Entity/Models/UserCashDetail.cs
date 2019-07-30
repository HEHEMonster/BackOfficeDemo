using System;
using System.Collections.Generic;

namespace ZDBACKOFFICE.Entity.Models
{
    public partial class UserCashDetail
    {
        public Guid Id { get; set; }
        public string OrderId { get; set; }
        public Guid UserId { get; set; }
        public int OperType { get; set; }
        public decimal Amount { get; set; }
        public decimal Balance { get; set; }
        public int Status { get; set; }
        public string Remark { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime? UpdateDate { get; set; }

        public UserInfo User { get; set; }
    }
}
