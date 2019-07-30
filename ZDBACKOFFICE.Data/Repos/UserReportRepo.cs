using System.Linq;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace ZDBACKOFFICE.Data
{
    using ZDBACKOFFICE.Core;
    using ZDBACKOFFICE.Entity.Models;

    public class UserReportRepo : RepoBase<UserReport>, IUserReportRepo
    {
        private readonly ZDDBContext _zdDBContext;
        public UserReportRepo(ZDDBContext zdDBcontext) : base(zdDBcontext)
        {
            _zdDBContext = zdDBcontext;
        }

        public IEnumerable<Audit.UserReport> GetUserReportsList(Audit.UserReport.Criteria criteria)
            => _zdDBContext.UserReport
                .OrderByDescending(x => x.CreateDate)
                .FilterBy(criteria)
                .Include(x => x.User)
                .Include(x => x.ReportUser)
                .AsNoTracking()
                .MapToList<Audit.UserReport>();
    }
}