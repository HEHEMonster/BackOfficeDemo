using System;
using System.Collections.Generic;

namespace ZDBACKOFFICE.Entity.Models
{
    public partial class UserBankCard
    {
        public int Id { get; set; }
        public Guid UserId { get; set; }
        public string UserName { get; set; }
        public string IdCardNo { get; set; }
        public string Telphone { get; set; }
        public string CardNumber { get; set; }
        public int CardType { get; set; }
        public string CardProvider { get; set; }
        public string CardPhoto { get; set; }
        public string BankName { get; set; }
        public int Status { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime UpdateDate { get; set; }

        public UserInfo User { get; set; }
    }
}
