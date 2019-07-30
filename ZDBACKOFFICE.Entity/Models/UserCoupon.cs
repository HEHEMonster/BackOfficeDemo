using System;
using System.Collections.Generic;

namespace ZDBACKOFFICE.Entity.Models
{
    public partial class UserCoupon
    {
        public string CouponId { get; set; }
        public Guid UserId { get; set; }
        public int Type { get; set; }
        public decimal Worth { get; set; }
        public int ChannelId { get; set; }
        public DateTime ExpirationStartTime { get; set; }
        public DateTime ExpirationEndTime { get; set; }
        public string Description { get; set; }
        public int Status { get; set; }
        public DateTime? RedeemTime { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime UpdateDate { get; set; }

        public UserInfo User { get; set; }
    }
}
