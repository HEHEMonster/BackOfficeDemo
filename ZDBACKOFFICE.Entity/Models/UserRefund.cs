using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace ZDBACKOFFICE.Entity.Models
{
    public partial class UserRefund
    {
        public int Id { get; set; }
        public Guid UserId { get; set; }

        public string WxOrderId { get; set; }
        public string RefundId { get; set; }
        public int PayType { get; set; }
        public string WxRefundId { get; set; }
        public decimal Price { get; set; }
        public int Status { get; set; }
        public string Reason { get; set; }
        public string Images { get; set; }
        public string Remark { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime UpdateDate { get; set; }

        public UserInfo User { get; set; }

        public string OrderId { get; set; }

        [ForeignKey("OrderId")]
        public virtual UserOrders Order { get; set; }
    }
}
