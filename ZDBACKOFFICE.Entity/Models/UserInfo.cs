using System;
using System.Collections.Generic;

namespace ZDBACKOFFICE.Entity.Models
{
    public partial class UserInfo
    {
        public UserInfo()
        {
            ActivityGuests = new HashSet<ActivityGuests>();
            ActivityJoinRecord = new HashSet<ActivityJoinRecord>();
            CashApply = new HashSet<CashApply>();
            DeviceInfo = new HashSet<DeviceInfo>();
            ManagementCommitteeUser = new HashSet<ManagementCommitteeUser>();
            UserAlbum = new HashSet<UserAlbum>();
            UserArticle = new HashSet<UserArticle>();
            UserBankCard = new HashSet<UserBankCard>();
            UserBlockBlock = new HashSet<UserBlock>();
            UserBlockUser = new HashSet<UserBlock>();
            UserCareer = new HashSet<UserCareer>();
            UserCashDetail = new HashSet<UserCashDetail>();
            UserCoupon = new HashSet<UserCoupon>();
            UserFavorite = new HashSet<UserFavorite>();
            UserGoldDetail = new HashSet<UserGoldDetail>();
            UserGroup = new HashSet<UserGroup>();
            UserInvite = new HashSet<UserInvite>();
            UserProduct = new HashSet<UserProduct>();
            UserPullTime = new HashSet<UserPullTime>();
        }

        public Guid UserId { get; set; }
        public string UserName { get; set; }
        public string Telphone { get; set; }
        public string NickName { get; set; }
        public string AvatarUrl { get; set; }
        public int Gender { get; set; }
        public DateTime? Birthday { get; set; }
        public string Address { get; set; }
        public int Vip { get; set; }
        public int Gold { get; set; }
        public decimal Balance { get; set; }
        public int Coupons { get; set; }
        public int Friends { get; set; }
        public int Follows { get; set; }
        public int Followers { get; set; }
        public int Collects { get; set; }
        public int Likes { get; set; }
        public int Approvals { get; set; }
        public int Visitors { get; set; }
        public int Score { get; set; }
        public int ScoreRank { get; set; }
        public int Moments { get; set; }
        public int Articles { get; set; }
        public int Products { get; set; }
        public int Photos { get; set; }
        public int Comments { get; set; }
        public string Industry { get; set; }
        public string FieldTags { get; set; }
        public string HopeTags { get; set; }
        public string BusinessInfo { get; set; }
        public string Company { get; set; }
        public string Position { get; set; }
        public int ZoneStatus { get; set; }
        public int Bnstatus { get; set; }
        public int Status { get; set; }
        public string Remark { get; set; }
        public DateTime RegisterAt { get; set; }
        public DateTime UpdateAt { get; set; }
        public string InviteUrl { get; set; }
        public int IdentityAuth { get; set; }
        public int Approveds { get; set; }
        public int CareerAuth { get; set; }
        public int? CareerType { get; set; }

        public BnCoverageRate BnCoverageRate { get; set; }
        public UserProfiles UserProfiles { get; set; }
        public YimToken YimToken { get; set; }
        public ICollection<ActivityGuests> ActivityGuests { get; set; }
        public ICollection<ActivityJoinRecord> ActivityJoinRecord { get; set; }
        public ICollection<CashApply> CashApply { get; set; }
        public ICollection<DeviceInfo> DeviceInfo { get; set; }
        public ICollection<ManagementCommitteeUser> ManagementCommitteeUser { get; set; }
        public ICollection<UserAlbum> UserAlbum { get; set; }
        public ICollection<UserArticle> UserArticle { get; set; }
        public ICollection<UserBankCard> UserBankCard { get; set; }
        public ICollection<UserBlock> UserBlockBlock { get; set; }
        public ICollection<UserBlock> UserBlockUser { get; set; }
        public ICollection<UserCareer> UserCareer { get; set; }
        public ICollection<UserCashDetail> UserCashDetail { get; set; }
        public ICollection<UserCoupon> UserCoupon { get; set; }
        public ICollection<UserFavorite> UserFavorite { get; set; }
        public ICollection<UserGoldDetail> UserGoldDetail { get; set; }
        public ICollection<UserGroup> UserGroup { get; set; }
        public ICollection<UserInvite> UserInvite { get; set; }
        public ICollection<UserProduct> UserProduct { get; set; }
        public ICollection<UserPullTime> UserPullTime { get; set; }
    }
}
