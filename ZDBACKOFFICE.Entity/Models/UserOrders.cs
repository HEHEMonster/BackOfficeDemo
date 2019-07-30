using System;
using System.Collections.Generic;

namespace ZDBACKOFFICE.Entity.Models
{
    public partial class UserOrders
    {
        public int Id { get; set; }
        public string OrderId { get; set; }
        public Guid UserId { get; set; }
        public string TradeNo { get; set; }
        public int OrderType { get; set; }
        public int SourceId { get; set; }
        public int PayType { get; set; }
        public decimal Discount { get; set; }
        public decimal TotalPrice { get; set; }
        public string CouponId { get; set; }
        public decimal? CouponPrice { get; set; }
        public decimal? PayPrice { get; set; }
        public int? PaySource { get; set; }
        public string InvoiceNo { get; set; }
        public int IsSure { get; set; }
        public int IsDelete { get; set; }
        public int AppInvoice { get; set; }
        public int Status { get; set; }
        public string Remark { get; set; }
        public DateTime? PayDate { get; set; }
        public DateTime? CreateDate { get; set; }
        public DateTime? UpdateDate { get; set; }
    }
}
