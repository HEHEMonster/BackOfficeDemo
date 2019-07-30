using System;
using System.Collections.Generic;

namespace ZDBACKOFFICE.Core
{
    using M = Audit;

    public interface IUserArticleRepo
    {
        IEnumerable<M.UserArticleList> GetUserArticleList(M.UserArticleList.Criteria criteria);
        ActionResult AuditUserArticle(M.UserArticleAuditDto auditDto);
        ActionResult ArticleAddTags(M.UserArticleAuditDto auditDto);
    }
}
