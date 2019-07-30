using System;
using System.Collections.Generic;

namespace ZDBACKOFFICE.Core.MongoDBModels
{
    public class Moments : MGBaseEntity
    {
        public int Type { get; set; }
        public string Content { get; set; }
        public string Medias { get; set; }
        public bool IsHot { get; set; }
        public int LikeCount { get; set; }
        public int CommentCount { get; set; }
        public string Tags { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime UpdateDate { get; set; }
        public string Remark { get; set; }
        public UserInfo User { get; set; }
        public string Telphone { get; set; }

        public class UserInfo
        {
            public string UserId { get; set; }
            public string UserName { get; set; }
            public string NickName { get; set; }
            //public int Gender { get; set; }
            //public string AvatarUrl { get; set; }
            //public string Position { get; set; }
            //public string Company { get; set; }
            //public string BusinessInfo { get; set; }
            //public string Industry { get; set; }
            //public string FieldTags { get; set; }
            //public int Vip { get; set; }
            //public int IdentityAuth { get; set; }
            //public int CareerAuth { get; set; }
            //public int CareerType { get; set; }
        }

        public class Citeria : Criteria
        {
            public int Type { get; set; }
            public string Telphone { get; set; }
            public string UserName { get; set; }
            public DateTime StartDate { get; set; }
            public DateTime EndDate { get; set; }
        }
    }

    public class UpdateMomentsDto : MGBaseEntity
    {
        public IEnumerable<string> Tags { get; set; }

        public string TagsString => string.Join(" ", Tags);
    }

    public class DeleteMomentsDto : MGBaseEntity
    {
        public string Remark { get; set; }
    }
}