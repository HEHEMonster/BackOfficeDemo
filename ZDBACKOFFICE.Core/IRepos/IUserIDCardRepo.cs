using System;
using System.Collections.Generic;

namespace ZDBACKOFFICE.Core
{
    using ZDBACKOFFICE.Entity.Models;
    using M = Audit;

    public interface IUserIDCardRepo
    {
        IEnumerable<M.UserIDCard> GetUserIDcardList(M.UserIDCard.Criteria criteria);
        UserIdcard GetUserIDcardDetails(Guid userId);
        ActionResult AuditUserIDcard(M.UserIDCardAuditDto model);
    }
}

