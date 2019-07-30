using System;
using System.Collections.Generic;

namespace ZDBACKOFFICE.Core
{
    using M = Audit;

    public interface IUserProductRepo
    {
        IEnumerable<M.UserProduct> GetUserProductList(M.UserProduct.Criteria criteria);
        ActionResult AuditUserProduct(M.UserProductAuditDto dto);
        ActionResult ProductAddTags(M.UserProductAuditDto dto);
    }
}
