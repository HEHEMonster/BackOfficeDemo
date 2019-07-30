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

    public class UserCareerRepo : RepoBase<UserCareer>, IUserCareerRepo
    {
        private readonly ZDDBContext _zdDBContext;
        private readonly INeo4jBase _neo4JBase;
        private readonly ILoginUserProvider _loginUserProvider;
        private readonly IZDUserCacheService _zdUserCacheService;

        public UserCareerRepo(ZDDBContext zdDBContext, INeo4jBase neo4JBase,
             ILoginUserProvider loginUserProvider, IZDUserCacheService zdUserCacheService) : base(zdDBContext)
        {
            _zdDBContext = zdDBContext;
            _neo4JBase = neo4JBase;
            _loginUserProvider = loginUserProvider;
            _zdUserCacheService = zdUserCacheService;
        }

        public IEnumerable<Audit.UserCareers> GetUserCareerList(Audit.UserCareers.Criteria criteria)
        {
            var userCareerList = (from career in _zdDBContext.UserCareer.Include(c => c.User).FilterBy(criteria, false)
                                  join record in _zdDBContext.AuditRecord.Include(a => a.Operator)
                                  on new
                                  {
                                      CareerId = career.Id.ToString(),
                                      AuditType = AuditType.Career.ToValue(),
                                      UserIdNotEqualsNull = career.UserId != null
                                  }
                                  equals
                                  new
                                  {
                                      CareerId = record.AuditId,
                                      record.AuditType,
                                      UserIdNotEqualsNull = true
                                  } into cr
                                  from a in cr.DefaultIfEmpty() 
                                  where string.IsNullOrEmpty(criteria.Auditor) || a.Operator.Name == criteria.Auditor
                                  orderby career.UpdateDate descending 
                                  select new Audit.UserCareers
                                  {
                                      Id =career.Id,
                                      RowId = Guid.NewGuid(),
                                      UserID = career.UserId,
                                      UserName = career.User.UserName,
                                      NickName = career.User.NickName,
                                      CareerType = (int)career.CareerType,
                                      Status = career.Status,
                                      CreateDate = career.CreateDate,
                                      UpdateDate = career.UpdateDate ?? null,
                                      Company = career.Company,
                                      Position = career.Position,
                                      CompanyTel = career.CompanyTel,
                                      Telphone = career.User.Telphone,
                                      CardUrl = career.CardUrl,
                                      Auditor = a.Operator.Name,
                                      AuditDate = a.AuditDate,
                                      ConfirmCareerType = career.User.CareerType,
                                      Count = (from p in _zdDBContext.UserCareer where p.UserId == career.UserId select p).Count()
                                  });
                    return userCareerList
                    .Sort(criteria.SortField, criteria.IsOrderByDesc)
                    .PaginationBy(criteria)
                    .AsNoTracking()
                    .ToList();
        }
        public ActionResult AuditUserCareer(Audit.UserCareerAuditDto dto)
            => TryTransaction((db) =>
            {
                var career = db.UserCareer.FirstOrDefault(x => x.Id == dto.ID);
                if (career == null) return ActionResult.Bad("未匹配到名片信息");

                var preStatus = career.Status;
                career.Status = dto.Status;
                career.Remark = dto.Remark;

                var userInfo = db.UserInfo.FirstOrDefault(x => x.UserId == career.UserId);
                userInfo.CareerAuth = dto.Status;
                userInfo.CareerType = dto.CareerType;

                db.AuditRecord.Add(new AuditRecord
                {
                    AuditId = career.Id.ToString(),
                    AuditType = (int)AuditType.Career,
                    AuditDate = DateTime.Now,
                    AuditorId = _loginUserProvider.GetUserID(),
                    Remark = career.Remark,
                    PreStatus = preStatus,
                    ToStatus = career.Status
                });

                if (db.SaveChanges() <= 0) return ActionResult.Bad("审核失败");

                // 更新Redis用户缓存
                _zdUserCacheService.AddUserCacheAsync(userInfo.Map<GlobalUserInfo>());

                if (!_neo4JBase.UpdateSingleNode("Person", userInfo)) throw new Exception("图形数据库更新失败");

                return ActionResult.Ok(true);
            });

    }
}
