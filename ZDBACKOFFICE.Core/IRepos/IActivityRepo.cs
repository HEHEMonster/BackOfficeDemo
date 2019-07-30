using System;
using System.Collections.Generic;
using ZDBACKOFFICE.Entity.Models;

namespace ZDBACKOFFICE.Core
{
    using M = Audit;

    public interface IActivityRepo
    {
        IEnumerable<M.Activity> GetActivitList(M.Activity.Criteria criteria);
        ActivityInfo GetActivityDetails(int activityId);


    }
}

