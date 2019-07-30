using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ZDBACKOFFICE.Core;
using ZDBACKOFFICE.Entity.Models;

namespace ZDBACKOFFICE.Data
{
    public class ActivityRepo : RepoBase<ActivityInfo>, IActivityRepo
    {
        private readonly ZDDBContext _zdDBContext;
        public ActivityRepo(ZDDBContext zdDBcontext) : base(zdDBcontext)
        {
            _zdDBContext = zdDBcontext;
        }

        public IEnumerable<Audit.Activity> GetActivitList(Audit.Activity.Criteria criteria)
          => _zdDBContext.ActivityInfo
              .FilterBy(criteria)
              .MapToList<Audit.Activity>();

        public ActivityInfo GetActivityDetails(int activityId)
           => _zdDBContext.ActivityInfo.Single(x => x.ActivityId == activityId);
        
    }
}
