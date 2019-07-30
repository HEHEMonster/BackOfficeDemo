using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace ZDBACKOFFICE.Data
{
    using ZDBACKOFFICE.Core;
    using ZDBACKOFFICE.Entity.Models;

    public class UserProductRepo : RepoBase<UserProduct>, IUserProductRepo
    {
        private readonly ZDDBContext _zdDBContext;
        private readonly ITagLibraryRepo _tagLibraryRepo;
        private readonly ILoginUserProvider _loginUserProvider;

        public UserProductRepo(ZDDBContext zdDBcontext, ITagLibraryRepo tagLibraryRepo, ILoginUserProvider loginUserProvider) : base(zdDBcontext)
        {
            _zdDBContext = zdDBcontext;
            _tagLibraryRepo = tagLibraryRepo;
            _loginUserProvider = loginUserProvider;
        }

        public IEnumerable<Audit.UserProduct> GetUserProductList(Audit.UserProduct.Criteria criteria)
        {
            var UserProductList = (
                from product in _zdDBContext.UserProduct.Include(x => x.User).FilterBy(criteria, false)
                join record in _zdDBContext.AuditRecord.Include(a => a.Operator)
                on new
                {
                    ID = product.Id.ToString(),
                    AuditType = AuditType.Product.ToValue(),
                    IdNotEqualNull = product.Id != null
                }
                equals
                new
                {
                    ID = record.AuditId,
                    record.AuditType,
                    IdNotEqualNull = true
                }
                into cr
                from a in cr.DefaultIfEmpty()
                where string.IsNullOrEmpty(criteria.Auditor) || a.Operator.Name == criteria.Auditor
                where criteria.AuditStartDate == null && criteria.AuditEndDate == null ||
                a.AuditDate >= criteria.AuditStartDate && a.AuditDate <= Convert.ToDateTime(criteria.AuditEndDate).AddDays(1)
                orderby product.CreateDate descending
                select new Audit.UserProduct
                {
                    ID = product.Id,
                    RowId = Guid.NewGuid(),
                    UserID = product.UserId,
                    UnitPrice = product.UnitPrice,
                    UserName = product.User.UserName,
                    Content = product.Content,
                    Title = product.Title,
                    Cover = product.Cover,
                    Tags = product.Tags,
                    CreateDate = product.CreateDate,
                    ViewCount = product.ViewCount,
                    CollectCount = product.CollectCount,
                    Status = product.Status,
                    Remark = a.Remark,
                    Telphone = product.User.Telphone,
                    Auditor = a.Operator.Name,
                    AuditDate = a.AuditDate
                });

             return UserProductList
                    .Sort(criteria.SortField, criteria.IsOrderByDesc)
                    .PaginationBy(criteria)
                    .AsNoTracking()
                    .ToList();
        }

        public ActionResult AuditUserProduct(Audit.UserProductAuditDto dto)
            => TryTransaction(db =>
            {
                var product = _zdDBContext.UserProduct.FirstOrDefault(x => x.Id == dto.ID);
                if (product == null) return ActionResult.Bad("未查询到产品信息");
                var preStatus = product.Status;
                product.Status = dto.Status;

                db.AuditRecord.Add(new AuditRecord
                {
                    AuditId = product.Id.ToString(),
                    AuditType = (int)AuditType.Product,
                    AuditDate = DateTime.Now,
                    AuditorId = _loginUserProvider.GetUserID(),
                    Remark = dto.AuditRemark,
                    PreStatus = preStatus,
                    ToStatus = product.Status
                });
                if (db.SaveChanges() <= 0) return ActionResult.Bad("审核更新数据失败");
                return ActionResult.Ok();
            });

        public ActionResult ProductAddTags(Audit.UserProductAuditDto dto)
            => TryTransaction(db =>
            {
                var product = _zdDBContext.UserProduct.FirstOrDefault(x => x.Id == dto.ID);
                if (product == null) return ActionResult.Bad("未查询到产品信息");
                product.Tags = string.Join(" ", dto.Tags);
                if (UpdateResult(product) <= 0) return ActionResult.Bad("标签添加失败");
                // 审核通过才同步mongoDB的标签库
                if (product.Status == (int)AuditStatus.Pass && dto.Tags.Count > 0)
                    _tagLibraryRepo.TagSynchronization(dto.Tags.ToArray(), (int)TagCategory.Product, dto.ID.ToString());
                return ActionResult.Ok();
            });
    }
}

