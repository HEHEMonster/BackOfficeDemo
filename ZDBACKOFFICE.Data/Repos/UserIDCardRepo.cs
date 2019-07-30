using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace ZDBACKOFFICE.Data
{
    using ZDBACKOFFICE.Core;
    using ZDBACKOFFICE.Data.Neo4j;
    using ZDBACKOFFICE.Entity.Models;
    using ZDBACKOFFICE.Entity.RedisModels;
    using ZDRedisCore;

    public class UserIDCardRepo : RepoBase<UserIdcard>, IUserIDCardRepo
    {
        private readonly INeo4jBase _neo4JBase;
        private readonly ZDDBContext _zdDBContext;
        private readonly ILoginUserProvider _loginUserProvider;
        private readonly IZDUserCacheService _zdUserCacheService;

        public UserIDCardRepo(ZDDBContext zdDBcontext, INeo4jBase neo4JBase,
             ILoginUserProvider loginUserProvider, IZDUserCacheService zdUserCacheService) : base(zdDBcontext)
        {
            _neo4JBase = neo4JBase;
            _zdDBContext = zdDBcontext;
            _loginUserProvider = loginUserProvider;
            _zdUserCacheService = zdUserCacheService;
        }

        public IEnumerable<Audit.UserIDCard> GetUserIDcardList(Audit.UserIDCard.Criteria criteria)
        {
            var userIDCardList = (from card in _zdDBContext.UserIdcard.Include(x => x.User).FilterBy(criteria, false)
                                  join record in _zdDBContext.AuditRecord.Include(a => a.Operator)
                                  on new
                                  {
                                      UserId = card.UserId.ToString(),
                                      AuditType = AuditType.IDCard.ToValue(),
                                      UserIdNotEqualsNull = card.UserId != null
                                  }
                                  equals
                                  new
                                  {
                                      UserId = record.AuditId,
                                      record.AuditType,
                                      UserIdNotEqualsNull = true
                                  } into cr
                                  from a in cr.DefaultIfEmpty()
                                  where string.IsNullOrEmpty(criteria.Auditor) || a.Operator.Name == criteria.Auditor
                                  orderby card.UpdateTime descending
                                  select new Audit.UserIDCard
                                  {
                                      ID = Guid.NewGuid(),
                                      UserID = card.UserId,
                                      UserName = card.UserName,
                                      Gender = card.Gender ?? 0,
                                      Nation = card.Nation,
                                      Birthday = card.Birthday,
                                      Address = card.Address,
                                      IdCardNumber = card.IdcardNo,
                                      IssuingAgency = card.IssuingAgency,
                                      ValidityStartTime = card.ValidityStartTime,
                                      ValidityEndTime = card.ValidityEndTime,
                                      IdcardFrontUrl = card.IdcardFrontUrl,
                                      IdcardBackUrl = card.IdcardBackUrl,
                                      CreateTime = card.CreateTime,
                                      UpdateTime = card.UpdateTime ?? null,
                                      Status = card.Status ?? 0,
                                      Phone = card.User.Telphone,
                                      Auditor = a.Operator.Name,
                                      AuditDate = a.AuditDate
                                  });
                                  
            return userIDCardList
                    .Sort(criteria.SortField, criteria.IsOrderByDesc)
                    .PaginationBy(criteria)
                    .AsNoTracking()
                    .ToList();
        }

        public UserIdcard GetUserIDcardDetails(Guid userId)
            => _zdDBContext.UserIdcard.Single(x => x.UserId == userId);

        public ActionResult AuditUserIDcard(Audit.UserIDCardAuditDto model)
            => TryTransaction(db =>
               {
                   var card = db.UserIdcard.Single(x => x.UserId == model.UserID);
                   if (card == null) return ActionResult.Bad("未查询到身份证信息");
                   var preStatus = card.Status;
                   card.Status = model.Status;
                   // 审核通过
                   if (card.Status == (int)AuditStatus.Pass)
                   {
                       //card.Gender = model.Gender;
                       //card.Nation = model.Nation;
                       //card.Address = model.Address;
                       //card.Birthday = model.Birthday;
                       card.UserName = model.UserName;
                       card.IdcardNo = model.IdCardNbr;
                       card.IssuingAgency = model.IssuingAgency;
                       card.ValidityEndTime = model.ValidityEndTime;
                       card.ValidityStartTime = model.ValidityStartTime;
                       card.UpdateTime = DateTime.Now;
                   }
                   else
                   {
                       card.Remark = model.Remark;
                   }

                   db.AuditRecord.Add(new AuditRecord
                   {
                       AuditId = card.UserId.ToString(),
                       AuditType = AuditType.IDCard.ToValue(),
                       AuditDate = DateTime.Now,
                       AuditorId = _loginUserProvider.GetUserID(),
                       Remark = card.Remark,
                       PreStatus = (int)preStatus,
                       ToStatus = (int)card.Status
                   });

                   var userInfo = db.UserInfo.Single(x => x.UserId == card.UserId);
                   userInfo.IdentityAuth = model.Status;

                   if (db.SaveChanges() <= 0) return ActionResult.Bad("审核更新数据失败");

                   // 更新Redis用户缓存
                   _zdUserCacheService.AddUserCacheAsync(userInfo.Map<GlobalUserInfo>());

                   if (!_neo4JBase.UpdateSingleNode("Person", userInfo)) throw new Exception("图形数据库更新失败");

                   return ActionResult.Ok("审核成功");
               });
    }
}
