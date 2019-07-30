using System;
using System.Collections.Generic;

namespace ZDBACKOFFICE.Core
{
    using M = Audit;

    public interface IPersonInfoRepo
    {
        IEnumerable<M.PersonInfo> GetPersonInfoList(M.PersonInfo.Criteria criteria);
        ActionResult AddPersonInfo(M.PersonAddition model);
        ActionResult AuditPersonInfo(M.PersonAuditDto dto);
        ActionResult ImportPersonInfo(IEnumerable<M.PersonInfo> personInfos);
    }
}
