using System.Collections.Generic;

namespace ZDBACKOFFICE.Core
{
    using ZDBACKOFFICE.Core.MongoDBModels;

    public interface IMomentsRepo
    {
        IEnumerable<Moments> GetMomentsList(Moments.Citeria criteria);
        ActionResult DeleteMoment(DeleteMomentsDto dto);
        ActionResult UpdateMomentsTags(UpdateMomentsDto dto);
    }
}
