using System;
using System.Collections.Generic;

namespace ZDBACKOFFICE.Core
{
    using M = Audit;

    public interface IUserCareerRepo
    {
        IEnumerable<M.UserCareers> GetUserCareerList(M.UserCareers.Criteria criteria);
        ActionResult AuditUserCareer(M.UserCareerAuditDto dto);
    }
}
