using System;
using System.Collections.Generic;

namespace ZDBACKOFFICE.Entity.Models
{
    public partial class UserProduct
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public decimal UnitPrice { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string Cover { get; set; }
        public int IsHot { get; set; }
        public int ViewCount { get; set; }
        public int LikeCount { get; set; }
        public int CollectCount { get; set; }
        public int CommentCount { get; set; }
        public string Tags { get; set; }
        public int Status { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime UpdateDate { get; set; }
        public string Remark { get; set; }

        public UserInfo User { get; set; }
    }
}
