using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace ZDBACKOFFICE.Entity.Models
{
    public partial class ZDDBContext : DbContext
    {
        //public ZDDBContext()
        //{
        //   使用DbContext Pool 代替 DbContext 注释该构造函数
        //}

        public ZDDBContext(DbContextOptions<ZDDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<ActivityGuests> ActivityGuests { get; set; }
        public virtual DbSet<ActivityInfo> ActivityInfo { get; set; }
        public virtual DbSet<ActivityJoinRecord> ActivityJoinRecord { get; set; }
        public virtual DbSet<Adinfo> Adinfo { get; set; }
        public virtual DbSet<AuditRecord> AuditRecord { get; set; }
        public virtual DbSet<BnCoverageRate> BnCoverageRate { get; set; }
        public virtual DbSet<CashApply> CashApply { get; set; }
        public virtual DbSet<DeviceInfo> DeviceInfo { get; set; }
        public virtual DbSet<GroupInfo> GroupInfo { get; set; }
        public virtual DbSet<ManagementCommittee> ManagementCommittee { get; set; }
        public virtual DbSet<ManagementCommitteeUser> ManagementCommitteeUser { get; set; }
        public virtual DbSet<ProspectPerson> ProspectPerson { get; set; }
        public virtual DbSet<RecommendItem> RecommendItem { get; set; }
        public virtual DbSet<ScheduleInfo> ScheduleInfo { get; set; }
        public virtual DbSet<SmsCode> SmsCode { get; set; }
        public virtual DbSet<SystemAuthorization> SystemAuthorization { get; set; }
        public virtual DbSet<SystemOperator> SystemOperator { get; set; }
        public virtual DbSet<SystemOperatorRole> SystemOperatorRole { get; set; }
        public virtual DbSet<SystemPermission> SystemPermission { get; set; }
        public virtual DbSet<SystemRoles> SystemRoles { get; set; }
        public virtual DbSet<SystemVersion> SystemVersion { get; set; }
        public virtual DbSet<UserAlbum> UserAlbum { get; set; }
        public virtual DbSet<UserArticle> UserArticle { get; set; }
        public virtual DbSet<UserBankCard> UserBankCard { get; set; }
        public virtual DbSet<UserBlock> UserBlock { get; set; }
        public virtual DbSet<UserCareer> UserCareer { get; set; }
        public virtual DbSet<UserCashDetail> UserCashDetail { get; set; }
        public virtual DbSet<UserCoupon> UserCoupon { get; set; }
        public virtual DbSet<UserFavorite> UserFavorite { get; set; }
        public virtual DbSet<UserGoldDetail> UserGoldDetail { get; set; }
        public virtual DbSet<UserGroup> UserGroup { get; set; }
        public virtual DbSet<UserIdcard> UserIdcard { get; set; }
        public virtual DbSet<UserInfo> UserInfo { get; set; }
        public virtual DbSet<UserInvite> UserInvite { get; set; }
        public virtual DbSet<UserOrders> UserOrders { get; set; }
        public virtual DbSet<UserProduct> UserProduct { get; set; }
        public virtual DbSet<UserProfiles> UserProfiles { get; set; }
        public virtual DbSet<UserPullTime> UserPullTime { get; set; }
        public virtual DbSet<UserQrcode> UserQrcode { get; set; }
        public virtual DbSet<UserRefund> UserRefund { get; set; }
        public virtual DbSet<UserReport> UserReport { get; set; }
        public virtual DbSet<UserShield> UserShield { get; set; }
        public virtual DbSet<UserThirdBind> UserThirdBind { get; set; }
        public virtual DbSet<UserToken> UserToken { get; set; }
        public virtual DbSet<UserVipInvite> UserVipInvite { get; set; }
        public virtual DbSet<YimToken> YimToken { get; set; }

        // Unable to generate entity type for table 'dbo.System_Seed'. Please see the warning messages.

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ActivityGuests>(entity =>
            {
                entity.HasKey(e => new { e.ActivityId, e.UserId });

                entity.ToTable("Activity_Guests");

                entity.Property(e => e.ActivityId).HasColumnName("ActivityID");

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.Property(e => e.CreateDate).HasColumnType("datetime");

                entity.Property(e => e.UpdateDate).HasColumnType("datetime");

                entity.HasOne(d => d.Activity)
                    .WithMany(p => p.ActivityGuests)
                    .HasForeignKey(d => d.ActivityId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Activity_Guests_Activity_Info");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.ActivityGuests)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Activity_Guests_User_Info");
            });

            modelBuilder.Entity<ActivityInfo>(entity =>
            {
                entity.HasKey(e => e.ActivityId);

                entity.ToTable("Activity_Info");

                entity.Property(e => e.ActivityId).HasColumnName("ActivityID");

                entity.Property(e => e.Address)
                    .IsRequired()
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.AddressDetail).HasMaxLength(200);

                entity.Property(e => e.BeginDate).HasColumnType("datetime");

                entity.Property(e => e.Content)
                    .IsRequired()
                    .HasColumnType("text");

                entity.Property(e => e.CoverPhoto)
                    .IsRequired()
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.CreateDate).HasColumnType("datetime");

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(5000)
                    .IsUnicode(false);

                entity.Property(e => e.EndDate).HasColumnType("datetime");

                entity.Property(e => e.Images)
                    .IsRequired()
                    .IsUnicode(false);

                entity.Property(e => e.RegistrationBegin).HasColumnType("datetime");

                entity.Property(e => e.RegistrationEnd).HasColumnType("datetime");

                entity.Property(e => e.Title)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.UnitPrice).HasColumnName("Unit_Price");

                entity.Property(e => e.UpdateDate).HasColumnType("datetime");
            });

            modelBuilder.Entity<ActivityJoinRecord>(entity =>
            {
                entity.HasKey(e => new { e.ActivityId, e.UserId });

                entity.ToTable("Activity_Join_Record");

                entity.Property(e => e.ActivityId).HasColumnName("ActivityID");

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.Property(e => e.CreateDate).HasColumnType("datetime");

                entity.Property(e => e.UpdateDate).HasColumnType("datetime");

                entity.HasOne(d => d.Activity)
                    .WithMany(p => p.ActivityJoinRecord)
                    .HasForeignKey(d => d.ActivityId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Activity_Join_Record_Activity_Info");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.ActivityJoinRecord)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Activity_Join_Record_User_Info");
            });

            modelBuilder.Entity<Adinfo>(entity =>
            {
                entity.ToTable("ADInfo");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.CoverUrl)
                    .IsRequired()
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.CreateDate).HasColumnType("datetime");

                entity.Property(e => e.JumpUrl)
                    .IsRequired()
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.Remark)
                    .IsRequired()
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.UpdateDate).HasColumnType("datetime");
            });

            modelBuilder.Entity<AuditRecord>(entity =>
            {
                entity.ToTable("Audit_Record");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.AuditDate).HasColumnType("datetime");

                entity.Property(e => e.AuditId)
                    .IsRequired()
                    .HasColumnName("AuditID")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.AuditorId)
                    .IsRequired()
                    .HasColumnName("AuditorID")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Remark)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.HasOne(e => e.Operator)
                    .WithMany(o => o.AuditRecords)
                    .HasForeignKey(e => e.AuditorId)
                    .HasConstraintName("FK_AuditRecord_Operator");
            });

            modelBuilder.Entity<BnCoverageRate>(entity =>
            {
                entity.HasKey(e => e.UserId);

                entity.ToTable("BN_Coverage_Rate");

                entity.Property(e => e.UserId)
                    .HasColumnName("UserID")
                    .ValueGeneratedNever();

                entity.Property(e => e.BuserCount).HasColumnName("BUserCount");

                entity.Property(e => e.Crate)
                    .HasColumnName("CRate")
                    .HasColumnType("decimal(18, 5)");

                entity.Property(e => e.CreateDate).HasColumnType("datetime");

                entity.Property(e => e.UpdateDate).HasColumnType("datetime");

                entity.HasOne(d => d.User)
                    .WithOne(p => p.BnCoverageRate)
                    .HasForeignKey<BnCoverageRate>(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BN_Coverage_Rate_User_Info");
            });

            modelBuilder.Entity<CashApply>(entity =>
            {
                entity.ToTable("Cash_Apply");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.BankAccount)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.BankAccountName)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.BankName)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.CreateDate).HasColumnType("datetime");

                entity.Property(e => e.OrderId)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Remark)
                    .IsRequired()
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.UpdateDate).HasColumnType("datetime");

                entity.Property(e => e.UserIdCard)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.HasOne(d => d.User)
                    .WithMany(p => p.CashApply)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Cash_Apply_User_Info");
            });

            modelBuilder.Entity<DeviceInfo>(entity =>
            {
                entity.ToTable("Device_Info");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.AppVersion)
                    .IsRequired()
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.CreateDate).HasColumnType("datetime");

                entity.Property(e => e.Model)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.SystemVersion)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.UpdateDate).HasColumnType("datetime");

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.Property(e => e.Uuid)
                    .IsRequired()
                    .HasColumnName("UUID")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.User)
                    .WithMany(p => p.DeviceInfo)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_DeviceInfo_User_Info");
            });

            modelBuilder.Entity<GroupInfo>(entity =>
            {
                entity.HasKey(e => e.GroupId);

                entity.ToTable("Group_Info");

                entity.Property(e => e.GroupId)
                    .HasColumnName("GroupID")
                    .ValueGeneratedNever();

                entity.Property(e => e.CreateDate).HasColumnType("datetime");

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.UpdateDate).HasColumnType("datetime");
            });

            modelBuilder.Entity<ManagementCommittee>(entity =>
            {
                entity.ToTable("Management_Committee");

                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .ValueGeneratedNever();

                entity.Property(e => e.Address)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CreateDate).HasColumnType("datetime");

                entity.Property(e => e.Region)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Telphone)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Updatetime).HasColumnType("datetime");
            });

            modelBuilder.Entity<ManagementCommitteeUser>(entity =>
            {
                entity.HasKey(e => e.VipId);

                entity.ToTable("Management_Committee_User");

                entity.Property(e => e.VipId)
                    .HasColumnName("VipID")
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .ValueGeneratedNever();

                entity.Property(e => e.CreateDate).HasColumnType("datetime");

                entity.Property(e => e.Region)
                    .IsRequired()
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.UpdateDate).HasColumnType("datetime");

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.ManagementCommitteeUser)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Management_Committee_User_User_Info");
            });

            modelBuilder.Entity<ProspectPerson>(entity =>
            {
                entity.ToTable("Prospect_Person");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Address)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Company)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CreateDate).HasColumnType("datetime");

                entity.Property(e => e.Industry)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.OperatorId)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Person)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Position)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Region)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Remark)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Telphone)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.UpdateDate).HasColumnType("datetime");
            });

            modelBuilder.Entity<RecommendItem>(entity =>
            {
                entity.ToTable("Recommend_Item");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.CreateDate).HasColumnType("datetime");

                entity.Property(e => e.ItemId).HasColumnName("ItemID");

                entity.Property(e => e.Tags)
                    .IsRequired()
                    .IsUnicode(false);

                entity.Property(e => e.UpdateDate).HasColumnType("datetime");
            });

            modelBuilder.Entity<ScheduleInfo>(entity =>
            {
                entity.Property(e => e.AppId)
                    .IsRequired()
                    .HasColumnName("AppID")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CreateAuthr).HasMaxLength(10);

                entity.Property(e => e.CreateTime).HasColumnType("datetime");

                entity.Property(e => e.CromExpress)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.EndRunTime).HasColumnType("datetime");

                entity.Property(e => e.InterfaceCode)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.JobGroup)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.JobName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.NextRunTime).HasColumnType("datetime");

                entity.Property(e => e.ServiceCode)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.StarRunTime).HasColumnType("datetime");

                entity.Property(e => e.TaskDescription)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.Token)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<SmsCode>(entity =>
            {
                entity.HasKey(e => e.SeqId);

                entity.Property(e => e.SeqId).HasColumnName("SeqID");

                entity.Property(e => e.Code)
                    .IsRequired()
                    .HasMaxLength(6)
                    .IsUnicode(false);

                entity.Property(e => e.CreatDate).HasColumnType("datetime");

                entity.Property(e => e.ExpiredTime).HasColumnType("datetime");

                entity.Property(e => e.PhoneNumber)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.SendNumber)
                    .IsRequired()
                    .HasMaxLength(6)
                    .IsUnicode(false);

                entity.Property(e => e.VerifyTime).HasColumnType("datetime");
            });

            modelBuilder.Entity<SystemAuthorization>(entity =>
            {
                entity.ToTable("System_Authorization");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.PermissionId).HasColumnName("PermissionID");

                entity.Property(e => e.RoleId).HasColumnName("RoleID");

                entity.Property(e => e.Status).HasDefaultValueSql("((1))");

                entity.HasOne(d => d.Permission)
                    .WithMany(p => p.SystemAuthorization)
                    .HasForeignKey(d => d.PermissionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PER_ID");

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.SystemAuthorization)
                    .HasForeignKey(d => d.RoleId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ROLE_ID");
            });

            modelBuilder.Entity<SystemOperator>(entity =>
            {
                entity.HasKey(e => e.OperatorId);

                entity.ToTable("System_Operator");

                entity.HasIndex(e => e.Name)
                    .HasName("Operator_Name")
                    .IsUnique();

                entity.Property(e => e.OperatorId)
                    .HasColumnName("OperatorID")
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .ValueGeneratedNever();

                entity.Property(e => e.CreateDate).HasColumnType("datetime");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.UpdateDate).HasColumnType("datetime");
            });

            modelBuilder.Entity<SystemOperatorRole>(entity =>
            {
                entity.ToTable("System_OperatorRole");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Operator)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.OperatorNavigation)
                    .WithMany(p => p.SystemOperatorRole)
                    .HasForeignKey(d => d.Operator)
                    .HasConstraintName("FK_OperatorID");

                entity.HasOne(d => d.RoleNavigation)
                    .WithMany(p => p.SystemOperatorRole)
                    .HasForeignKey(d => d.Role)
                    .HasConstraintName("FK_Role");
            });

            modelBuilder.Entity<SystemPermission>(entity =>
            {
                entity.ToTable("System_Permission");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.PermissionName)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Status).HasDefaultValueSql("((1))");
            });

            modelBuilder.Entity<SystemRoles>(entity =>
            {
                entity.HasKey(e => e.RoleId);

                entity.ToTable("System_Roles");

                entity.Property(e => e.RoleId).HasColumnName("RoleID");

                entity.Property(e => e.CreateDate).HasColumnType("datetime");

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.RoleName)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.UpdateDate).HasColumnType("datetime");
            });

            modelBuilder.Entity<SystemVersion>(entity =>
            {
                entity.ToTable("System_Version");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.CreateDate).HasColumnType("datetime");

                entity.Property(e => e.DownLoadUrl)
                    .IsRequired()
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.Version)
                    .IsRequired()
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.VersionInfo)
                    .IsRequired()
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.VersionUrl)
                    .IsRequired()
                    .HasMaxLength(500)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<UserAlbum>(entity =>
            {
                entity.ToTable("User_Album");

                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .ValueGeneratedNever();

                entity.Property(e => e.CreateDate).HasColumnType("datetime");

                entity.Property(e => e.Photo)
                    .IsRequired()
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.Remark)
                    .IsRequired()
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.UserAlbum)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Zone_Album_User_Info1");
            });

            modelBuilder.Entity<UserArticle>(entity =>
            {
                entity.ToTable("User_Article");

                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .ValueGeneratedNever();

                entity.Property(e => e.Content)
                    .IsRequired()
                    .IsUnicode(false);

                entity.Property(e => e.Cover)
                    .IsRequired()
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.Remark)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.Tags)
                    .IsRequired()
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.UserArticle)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_User_Article_User_Info");
            });

            modelBuilder.Entity<UserBankCard>(entity =>
            {
                entity.ToTable("User_BankCard");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.BankName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CardNumber)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.CardPhoto)
                    .IsRequired()
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.CardProvider)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.CreateDate).HasColumnType("datetime");

                entity.Property(e => e.IdCardNo)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Telphone)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.UpdateDate).HasColumnType("datetime");

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.Property(e => e.UserName)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.HasOne(d => d.User)
                    .WithMany(p => p.UserBankCard)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_User_Bank_User_Info");
            });

            modelBuilder.Entity<UserBlock>(entity =>
            {
                entity.ToTable("User_Block");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.BlockId).HasColumnName("BlockID");

                entity.Property(e => e.CreateDate).HasColumnType("datetime");

                entity.Property(e => e.UpdateDate).HasColumnType("datetime");

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.HasOne(d => d.Block)
                    .WithMany(p => p.UserBlockBlock)
                    .HasForeignKey(d => d.BlockId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_User_Block_User_Info1");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.UserBlockUser)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_User_Block_User_Info");
            });

            modelBuilder.Entity<UserCareer>(entity =>
            {
                entity.ToTable("User_Career");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.CardUrl)
                    .IsRequired()
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.Company)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CompanyTel)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.CreateDate).HasColumnType("datetime");

                entity.Property(e => e.Position)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Remark)
                    .HasMaxLength(1000)
                    .IsUnicode(false);

                entity.Property(e => e.UpdateDate).HasColumnType("datetime");

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.UserCareer)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_User_Career_User_Info");
            });

            modelBuilder.Entity<UserCashDetail>(entity =>
            {
                entity.ToTable("User_Cash_Detail");

                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .ValueGeneratedNever();

                entity.Property(e => e.CreateDate).HasColumnType("datetime");

                entity.Property(e => e.OrderId)
                    .HasColumnName("OrderID")
                    .HasMaxLength(50);

                entity.Property(e => e.Remark)
                    .IsRequired()
                    .HasMaxLength(5000)
                    .IsUnicode(false);

                entity.Property(e => e.UpdateDate).HasColumnType("datetime");

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.UserCashDetail)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_User_Cash_Detail_User_Info");
            });

            modelBuilder.Entity<UserCoupon>(entity =>
            {
                entity.HasKey(e => e.CouponId);

                entity.ToTable("User_Coupon");

                entity.Property(e => e.CouponId)
                    .HasColumnName("CouponID")
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .ValueGeneratedNever();

                entity.Property(e => e.ChannelId).HasColumnName("ChannelID");

                entity.Property(e => e.CreateDate).HasColumnType("datetime");

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.ExpirationEndTime).HasColumnType("datetime");

                entity.Property(e => e.ExpirationStartTime).HasColumnType("datetime");

                entity.Property(e => e.RedeemTime).HasColumnType("datetime");

                entity.Property(e => e.UpdateDate).HasColumnType("datetime");

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.UserCoupon)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_User_Coupon_User_Info");
            });

            modelBuilder.Entity<UserFavorite>(entity =>
            {
                entity.ToTable("User_Favorite");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.CreateDate).HasColumnType("datetime");

                entity.Property(e => e.ObjId)
                    .IsRequired()
                    .HasColumnName("ObjID")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.UpdateDate).HasColumnType("datetime");

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.UserFavorite)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_User_Favorites_User_Info");
            });

            modelBuilder.Entity<UserGoldDetail>(entity =>
            {
                entity.ToTable("User_Gold_Detail");

                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .ValueGeneratedNever();

                entity.Property(e => e.CreateDate).HasColumnType("datetime");

                entity.Property(e => e.OrderId)
                    .HasColumnName("OrderID")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Remark)
                    .IsRequired()
                    .HasMaxLength(5000)
                    .IsUnicode(false);

                entity.Property(e => e.UpdateDate).HasColumnType("datetime");

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.UserGoldDetail)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_User_Gold_Detial_User_Info");
            });

            modelBuilder.Entity<UserGroup>(entity =>
            {
                entity.ToTable("User_Group");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.CreateDate).HasColumnType("datetime");

                entity.Property(e => e.GroupId).HasColumnName("GroupID");

                entity.Property(e => e.UpdateDate).HasColumnType("datetime");

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.UserGroup)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_User_Group_User_Info");
            });

            modelBuilder.Entity<UserIdcard>(entity =>
            {
                entity.HasKey(e => e.UserId);

                entity.ToTable("User_IDCard");

                entity.Property(e => e.UserId)
                    .HasColumnName("UserID")
                    .ValueGeneratedNever();

                entity.Property(e => e.Address)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.Birthday).HasColumnType("datetime");

                entity.Property(e => e.CreateTime).HasColumnType("datetime");

                entity.Property(e => e.IdcardBackUrl)
                    .HasColumnName("IDCardBackUrl")
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.IdcardFrontUrl)
                    .HasColumnName("IDCardFrontUrl")
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.IdcardNo)
                    .HasColumnName("IDCardNo")
                    .HasMaxLength(18)
                    .IsUnicode(false);

                entity.Property(e => e.IssuingAgency)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Nation)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.Remark)
                    .HasMaxLength(1000)
                    .IsUnicode(false);

                entity.Property(e => e.UpdateTime).HasColumnType("datetime");

                entity.Property(e => e.UserName)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.ValidityEndTime).HasColumnType("datetime");

                entity.Property(e => e.ValidityStartTime).HasColumnType("datetime");
            });

            modelBuilder.Entity<UserInfo>(entity =>
            {
                entity.HasKey(e => e.UserId);

                entity.ToTable("User_Info");

                entity.Property(e => e.UserId)
                    .HasColumnName("UserID")
                    .ValueGeneratedNever();

                entity.Property(e => e.Address)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.AvatarUrl)
                    .IsRequired()
                    .HasColumnName("Avatar_URL")
                    .IsUnicode(false);

                entity.Property(e => e.Birthday).HasColumnType("datetime");

                entity.Property(e => e.Bnstatus).HasColumnName("BNStatus");

                entity.Property(e => e.BusinessInfo)
                    .IsRequired()
                    .HasMaxLength(1000)
                    .IsUnicode(false);

                entity.Property(e => e.CareerAuth).HasColumnName("Career_Auth");

                entity.Property(e => e.CareerType).HasColumnName("Career_Type");

                entity.Property(e => e.Company)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.FieldTags)
                    .IsRequired()
                    .HasColumnName("Field_Tags")
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.HopeTags)
                    .IsRequired()
                    .HasColumnName("Hope_Tags")
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.IdentityAuth).HasColumnName("Identity_Auth");

                entity.Property(e => e.Industry)
                    .IsRequired()
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.InviteUrl)
                    .IsRequired()
                    .HasColumnName("Invite_Url")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.NickName)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Position)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.RegisterAt)
                    .HasColumnName("Register_At")
                    .HasColumnType("datetime");

                entity.Property(e => e.Remark)
                    .IsRequired()
                    .HasMaxLength(300)
                    .IsUnicode(false);

                entity.Property(e => e.Telphone)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.UpdateAt)
                    .HasColumnName("Update_At")
                    .HasColumnType("datetime");

                entity.Property(e => e.UserName)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<UserInvite>(entity =>
            {
                entity.ToTable("User_Invite");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.CreateDate).HasColumnType("datetime");

                entity.Property(e => e.InviteCode)
                    .IsRequired()
                    .HasColumnName("Invite_Code")
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.InviteTelphone)
                    .IsRequired()
                    .HasColumnName("Invite_Telphone")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.UpdateDate).HasColumnType("datetime");

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.UserInvite)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_User_Invite_User_Info");
            });

            modelBuilder.Entity<UserOrders>(entity =>
            {
                entity.HasKey(e => e.OrderId);

                entity.ToTable("User_Orders");

                entity.Property(e => e.OrderId)
                    .HasColumnName("OrderID")
                    .HasMaxLength(50)
                    .ValueGeneratedNever();

                entity.Property(e => e.CouponId).HasMaxLength(50);

                entity.Property(e => e.CreateDate).HasColumnType("datetime");

                entity.Property(e => e.Discount).HasDefaultValueSql("((1))");

                entity.Property(e => e.Id).ValueGeneratedOnAdd();

                entity.Property(e => e.InvoiceNo).HasMaxLength(50);

                entity.Property(e => e.PayDate).HasColumnType("datetime");

                entity.Property(e => e.PaySource).HasDefaultValueSql("((1))");

                entity.Property(e => e.Remark)
                    .IsRequired()
                    .HasMaxLength(5000)
                    .IsUnicode(false);

                entity.Property(e => e.SourceId).HasColumnName("sourceID");

                entity.Property(e => e.TradeNo).HasMaxLength(50);

                entity.Property(e => e.UpdateDate).HasColumnType("datetime");

                entity.Property(e => e.UserId).HasColumnName("UserID");
            });

            modelBuilder.Entity<UserProduct>(entity =>
            {
                entity.ToTable("User_Product");

                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .ValueGeneratedNever();

                entity.Property(e => e.Content)
                    .IsRequired()
                    .IsUnicode(false);

                entity.Property(e => e.Cover)
                    .IsRequired()
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.Remark)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.Tags)
                    .IsRequired()
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.UserProduct)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_User_Product_User_Info");
            });

            modelBuilder.Entity<UserProfiles>(entity =>
            {
                entity.HasKey(e => e.UserId);

                entity.ToTable("User_Profiles");

                entity.Property(e => e.UserId)
                    .HasColumnName("UserID")
                    .ValueGeneratedNever();

                entity.Property(e => e.CreateDate).HasColumnType("datetime");

                entity.Property(e => e.Properties).HasMaxLength(500);

                entity.Property(e => e.UpdateDate).HasColumnType("datetime");

                entity.HasOne(d => d.User)
                    .WithOne(p => p.UserProfiles)
                    .HasForeignKey<UserProfiles>(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_User_Profiles_User_Info");
            });

            modelBuilder.Entity<UserPullTime>(entity =>
            {
                entity.HasKey(e => new { e.UserId, e.Type });

                entity.ToTable("User_PullTime");

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.Property(e => e.PullDate).HasColumnType("datetime");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.UserPullTime)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_User_PullTime_User_Info");
            });

            modelBuilder.Entity<UserQrcode>(entity =>
            {
                entity.ToTable("User_Qrcode");

                entity.Property(e => e.ActionUserId).HasMaxLength(50);

                entity.Property(e => e.CreateDate).HasColumnType("datetime");

                entity.Property(e => e.Remark)
                    .IsRequired()
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.UpdateDate).HasColumnType("datetime");
            });

            modelBuilder.Entity<UserRefund>(entity =>
            {
                entity.ToTable("User_Refund");

                entity.Property(e => e.CreateDate).HasColumnType("datetime");

                entity.Property(e => e.Images).HasMaxLength(200);

                entity.Property(e => e.OrderId)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Reason)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.RefundId)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Remark).HasMaxLength(200);

                entity.Property(e => e.UpdateDate).HasColumnType("datetime");

                entity.Property(e => e.WxOrderId).HasMaxLength(50);

                entity.Property(e => e.WxRefundId).HasMaxLength(50);
            });

            modelBuilder.Entity<UserReport>(entity =>
            {
                entity.HasKey(e => e.ReportId);

                entity.ToTable("User_Report");

                entity.Property(e => e.ReportId).HasColumnName("ReportID");

                entity.Property(e => e.Contact)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.CreateDate).HasColumnType("datetime");

                entity.Property(e => e.Photos)
                    .HasMaxLength(5000)
                    .IsUnicode(false);

                entity.Property(e => e.ProcessingResults)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Reason).HasMaxLength(500);

                entity.Property(e => e.ReportType)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.ReportUserId).HasColumnName("ReportUserID");

                entity.Property(e => e.SourceId)
                    .HasColumnName("SourceID")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.SourceType)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.UpdateDate).HasColumnType("datetime");

                entity.Property(e => e.UserId).HasColumnName("UserID");
            });

            modelBuilder.Entity<UserShield>(entity =>
            {
                entity.ToTable("User_Shield");

                entity.Property(e => e.CreateDate).HasColumnType("datetime");

                entity.Property(e => e.OpType).HasDefaultValueSql("((1))");

                entity.Property(e => e.Remark)
                    .IsRequired()
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.ShieldId)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.UpdateDate).HasColumnType("datetime");
            });

            modelBuilder.Entity<UserThirdBind>(entity =>
            {
                entity.HasKey(e => new { e.UserId, e.PlatformType });

                entity.ToTable("User_Third_Bind");

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.Property(e => e.PlatformType).HasColumnName("Platform_Type");

                entity.Property(e => e.CreateDate).HasColumnType("datetime");

                entity.Property(e => e.PlatformId)
                    .IsRequired()
                    .HasColumnName("Platform_ID")
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<UserToken>(entity =>
            {
                entity.HasKey(e => e.Token);

                entity.ToTable("User_Token");

                entity.Property(e => e.Token)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .ValueGeneratedNever();

                entity.Property(e => e.CreatDate).HasColumnType("datetime");

                entity.Property(e => e.ExpiredDate).HasColumnType("datetime");

                entity.Property(e => e.UserId).HasColumnName("UserID");
            });

            modelBuilder.Entity<UserVipInvite>(entity =>
            {
                entity.ToTable("User_VipInvite");

                entity.Property(e => e.CreateDate).HasColumnType("datetime");

                entity.Property(e => e.InviteUserId)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.OrderId)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Remark)
                    .IsRequired()
                    .HasMaxLength(5000)
                    .IsUnicode(false);

                entity.Property(e => e.UpdateDate).HasColumnType("datetime");

                entity.Property(e => e.UserId)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<YimToken>(entity =>
            {
                entity.HasKey(e => e.UserId);

                entity.ToTable("YIM_Token");

                entity.Property(e => e.UserId)
                    .HasColumnName("UserID")
                    .ValueGeneratedNever();

                entity.Property(e => e.CreateDate).HasColumnType("datetime");

                entity.Property(e => e.Imtoken)
                    .IsRequired()
                    .HasColumnName("IMToken")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d. User)
                    .WithOne(p => p.YimToken)
                    .HasForeignKey<YimToken>(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_YIM_Token_User_Info");
            });
        }
    }
}
