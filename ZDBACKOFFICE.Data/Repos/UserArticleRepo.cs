using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace ZDBACKOFFICE.Data
{
    using ZDBACKOFFICE.Core;
    using ZDBACKOFFICE.Data;
    using ZDBACKOFFICE.Entity.Models;


    public class UserArticleRepo : RepoBase<UserArticle>, IUserArticleRepo
    {
        private readonly ZDDBContext _zdDBContext;
        private readonly ITagLibraryRepo _tagLibraryRepo;
        private readonly ILoginUserProvider _loginUserProvider;


        public UserArticleRepo(ZDDBContext zdDBcontext, ITagLibraryRepo tagLibraryRepo, ILoginUserProvider loginUserProvider) : base(zdDBcontext)
        {
            _zdDBContext = zdDBcontext;
            _tagLibraryRepo = tagLibraryRepo;
            _loginUserProvider = loginUserProvider;
        }

        public IEnumerable<Audit.UserArticleList> GetUserArticleList(Audit.UserArticleList.Criteria criteria)
        {
            var userArticleList = (
                from article in _zdDBContext.UserArticle.Include(x => x.User).FilterBy(criteria, false)
                join record in _zdDBContext.AuditRecord.Include(a => a.Operator)
                on new
                {
                    ID = article.Id.ToString(),
                    AuditType = AuditType.Article.ToValue(),
                    IdNotEqualNull = article.Id != null
                }
                equals new
                {
                    ID = record.AuditId,
                    record.AuditType,
                    IdNotEqualNull = true
                } into cr
                from a in cr.DefaultIfEmpty()
                where string.IsNullOrEmpty(criteria.Auditor) || a.Operator.Name == criteria.Auditor
                where criteria.AuditStartDate == null && criteria.AuditEndDate == null ||
                a.AuditDate >= criteria.AuditStartDate && a.AuditDate <= Convert.ToDateTime(criteria.AuditEndDate).AddDays(1)
                orderby article.CreateDate descending
                select new Audit.UserArticleList
                {
                    ID = article.Id,
                    RowId = Guid.NewGuid(),
                    UserID = article.UserId,
                    UserName = article.User.UserName,
                    Type = article.Type,
                    Title = article.Title,
                    Status = article.Status,
                    CreateDate = article.CreateDate,
                    UpdateDate = article.UpdateDate,
                    Content = article.Content,
                    Cover = article.Cover,
                    IsHot = article.IsHot,
                    ViewCount = article.ViewCount,
                    LikeCount = article.LikeCount,
                    CollectCount = article.CollectCount,
                    CommentCount = article.CommentCount,
                    Tags = article.Tags,
                    Remark = a.Remark,
                    Telphone = article.User.Telphone,
                    Auditor = a.Operator.Name,
                    AuditDate = a.AuditDate
                });
            return userArticleList
                    .Sort(criteria.SortField, criteria.IsOrderByDesc)
                    .PaginationBy(criteria)
                    .AsNoTracking()
                    .ToList();
        }

        //文章审核
        public ActionResult AuditUserArticle(Audit.UserArticleAuditDto dto)
            => TryTransaction(db =>
            {
                var article = _zdDBContext.UserArticle.FirstOrDefault(x => x.Id == dto.ID);                      // 根据ID查询数据是否存在
                if (article == null) return ActionResult.Bad("数据不存在");                                       // 不存在返回信息
                var preStatus = article.Status;                                                                  //获取原本状态
                article.IsHot = dto.IsHot;                                                                       // 是否推送热门
                article.Status = dto.Status;                                                                     // 更改状态

                db.AuditRecord.Add(new AuditRecord
                {
                    AuditId = article.Id.ToString(),
                    AuditType = (int)AuditType.Article,
                    AuditDate = DateTime.Now,
                    AuditorId = _loginUserProvider.GetUserID(),
                    Remark = dto.Remark,
                    PreStatus = preStatus,
                    ToStatus = dto.Status
                });
                if (db.SaveChanges() <= 0) return ActionResult.Bad("审核失败,请重新审核");      //提交失败返回信息
                return ActionResult.Ok();
            });


        //添加标签
        public ActionResult ArticleAddTags(Audit.UserArticleAuditDto dto)
            => TryTransaction(db =>
            {
                var article = _zdDBContext.UserArticle.FirstOrDefault(x => x.Id == dto.ID);
                if (article == null) return ActionResult.Bad("数据不存在");
                article.Tags = string.Join(" ", dto.Tags);
                if (UpdateResult(article) <= 0) return ActionResult.Bad("添加标签失败");
                // 审核通过才同步mongoDB的标签库
                if (article.Status == (int)AuditStatus.Pass && dto.Tags.Count > 0)
                    _tagLibraryRepo.TagSynchronization(dto.Tags.ToArray(), (int)TagCategory.Article, dto.ID.ToString());
                return ActionResult.Ok();
            });
    }
}
