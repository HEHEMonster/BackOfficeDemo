using System;
using System.Collections.Generic;

namespace ZDBACKOFFICE.Core
{
    using global::System.Linq.Expressions;
    using ZDBACKOFFICE.Entity.Models;
    partial class Audit
    {
        public class UserArticleList
        {
            public Guid ID { get; set; }
            public Guid RowId { get; set; }
            public Guid UserID { get; set; }
            public string UserName { get; set; }
            public int Type { get; set; }
            public string Title { get; set; }
            public int Status { get; set; }
            public DateTime CreateDate { get; set; }
            public DateTime UpdateDate { get; set; }
            public string Content { get; set; }
            public string Cover { get; set; }
            public int IsHot { get; set; }
            public int ViewCount { get; set; }
            public int LikeCount { get; set; }
            public int CollectCount { get; set; }
            public int CommentCount { get; set; }
            public string Tags { get; set; }
            public string Remark { get; set; }
            public string Telphone { get; set; }
            public string Auditor { get; set;}
            public DateTime? AuditDate { get; set; }


            public class Criteria : Criteria<UserArticle>
            {
                public int Type { get; set; }
                public DateTime? StartDate { get; set; }
                public DateTime? EndDate { get; set; }
                public DateTime? AuditStartDate { get; set; }
                public DateTime? AuditEndDate { get; set; }
                public int Status { get; set; }
                public string UserName { get; set; }
                public string Telphone { get; set; }
                public string Auditor { get; set; }
                protected override void OnCollect(ICriteriaPool<UserArticle> pool)
                {
                    pool.Add(x => x.Type == Type, Type > (int)ZDBACKOFFICE.ArticleType.All)
                        .Add(x => x.Status == Status, Status != (int)AuditStatus.All)
                        .Add(x => x.User.UserName == UserName.Trim(), !string.IsNullOrEmpty(UserName))
                        .Add(x => x.User.Telphone == Telphone.Trim(), !string.IsNullOrEmpty(Telphone))
                        .Add(x => x.CreateDate >= StartDate && x.CreateDate <= Convert.ToDateTime(EndDate).AddDays(1));
                        
                }
            }
        }

        public class UserArticleAuditDto
        {
            public Guid ID { get; set; }
            public int Status { get; set; }
            public int IsHot { get; set; }
            public string Remark { get; set; }
            public List<string> Tags { get; set; }
        }
    }
}
