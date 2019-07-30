using System;
using System.Collections.Generic;

namespace ZDBACKOFFICE.Core
{
    using M = Audit;
    public interface IUserReportRepo
    {
        IEnumerable<M.UserReport> GetUserReportsList(M.UserReport.Criteria criteria);
    }
}