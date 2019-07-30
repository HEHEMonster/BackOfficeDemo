using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using StoredProcedureEFCore;

namespace ZDBACKOFFICE.Data
{
    using ZDBACKOFFICE.Core;
    using ZDBACKOFFICE.Entity.Models;

    public class UserFeedBackRepo : RepoBase<UserReport>, IUserFeedBackRepo
    {        
        private readonly ZDDBContext _zdDBContext;
        
        public UserFeedBackRepo(ZDDBContext zdDBcontext) : base(zdDBcontext)
        {
            _zdDBContext = zdDBcontext;
        }
        public IEnumerable<UserFeedBackList> GetFeedBackList(UserFeedBackList.Criteria criteria)
            => _zdDBContext.UserReport
                .OrderByDescending(x => x.CreateDate)
                .FilterBy(criteria)
                .Include(c => c.User)
                .Include(c => c.ReportUser)
                .MapToList<UserFeedBackList>();

        public ActionResult CreateFeedBack(CreateFeedBackDto dto)
            => TryCatch(db =>
            {
                var userInfo = _zdDBContext.UserInfo.FirstOrDefault(x => x.UserName == dto.Name.Trim());
                if(userInfo == null) return ActionResult.Bad("用户不存在");
                db.UserReport.Add(new UserReport
                {
                    ReportUserId = userInfo.UserId,
                    UserId = userInfo.UserId,
                    Contact = dto.Contact,
                    CreateDate = dto.CreateDate,  //DateTime.Now,
                    UpdateDate = dto.CreateDate,
                    Reason = dto.Reason,
                    Photos = dto.Photos,
                    ReportType = 0.ToString(),
                    SourceType = 1.ToString(),
                });
                if(db.SaveChanges() < 0 ) return ActionResult.Bad("录入失败");
                return ActionResult.Ok("录入成功");
            });
    }
}