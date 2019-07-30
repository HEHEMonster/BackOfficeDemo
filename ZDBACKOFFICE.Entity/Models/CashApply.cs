using System;
using System.Collections.Generic;

namespace ZDBACKOFFICE.Entity.Models
{
    public partial class CashApply
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public string OrderId { get; set; }
        public string UserIdCard { get; set; }
        public decimal Amount { get; set; }
        public string BankName { get; set; }
        public string BankAccountName { get; set; }
        public string BankAccount { get; set; }
        public string Remark { get; set; }
        public int Status { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime UpdateDate { get; set; }

        public UserInfo User { get; set; }
    }
}
