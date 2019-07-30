using System;
using System.Collections.Generic;

namespace ZDBACKOFFICE.Core
{
    public interface IUserFeedBackRepo
    {
        IEnumerable<UserFeedBackList> GetFeedBackList(UserFeedBackList.Criteria criteria);
        ActionResult CreateFeedBack(CreateFeedBackDto dto);
    }
}
