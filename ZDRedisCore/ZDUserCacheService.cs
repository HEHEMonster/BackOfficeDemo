using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace ZDRedisCore
{
    using CSRedis;
    using ZDBACKOFFICE.Entity.Models;
    using ZDBACKOFFICE.Entity.RedisModels;

    public class ZDUserCacheService : IZDUserCacheService
    {
        private CSRedisClient _instance;
        private DbContext _dbContext;
        //private static RedisHelper _redisHelper;
        private const string _hashkey = "hashusers";
        public ZDUserCacheService(CSRedisClient cSRedisClient, ZDDBContext zDDBContext)
        {
            _instance = cSRedisClient;
            _dbContext = zDDBContext;
            RedisHelper.Initialization(_instance);
        }

        /// <summary>
        /// 添加用户缓存
        /// </summary>
        /// <returns>The user cache async.</returns>
        /// <param name="user">User.</param>
        public async Task<bool> AddUserCacheAsync(GlobalUserInfo user)
        {
            return await RedisHelper.HSetAsync(_hashkey, user.UserId.ToString(), user);
        }

        /// <summary>
        /// 批量添加用户缓存
        /// </summary>
        /// <returns>The users cache async.</returns>
        /// <param name="users">Users.</param>
        public async Task<bool> AddUsersCacheAsync(List<GlobalUserInfo> users)
        {
            List<object> keyValuePairs = new List<object>();
            users.ForEach(a => { keyValuePairs.Add(a.UserId.ToString()); keyValuePairs.Add(a); });
            return await RedisHelper.HMSetAsync(_hashkey, keyValuePairs.ToArray());
        }

        /// <summary>
        /// 获取单个用户缓存
        /// </summary>
        /// <returns>The cache user async.</returns>
        /// <param name="userId">User identifier.</param>
        public async Task<GlobalUserInfo> GetCacheUserAsync(string userId)
        {
            return await RedisHelper.HGetAsync<GlobalUserInfo>(_hashkey, userId);
        }

        /// <summary>
        /// 获取用户缓存列表
        /// </summary>
        /// <returns>The user cache list async.</returns>
        /// <param name="userIds">User identifiers.</param>
        public async Task<List<GlobalUserInfo>> GetUserCacheListAsync(List<string> userIds)
        {
            GlobalUserInfo[] cacheUsers = await RedisHelper.HMGetAsync<GlobalUserInfo>(_hashkey, userIds.ToArray());
            return cacheUsers.ToList();
        }

        /// <summary>
        /// 批量删除用户缓存
        /// </summary>
        /// <returns>The user cache async.</returns>
        /// <param name="userIds">User identifiers.</param>
        public async Task<long> DeleteUserCacheAsync(List<string> userIds)
        {
            return await RedisHelper.HDelAsync(_hashkey, userIds.ToArray());
        }

        /// <summary>
        /// 获取全部用户缓存
        /// </summary>
        /// <returns>The all.</returns>
        public Dictionary<string, GlobalUserInfo> GetAll()
        {
            return RedisHelper.HGetAll<GlobalUserInfo>(_hashkey);
        }

        /// <summary>
        /// 清除所有用户缓存
        /// </summary>
        /// <returns>The all.</returns>
        public long DeleteAll()
        {
            return RedisHelper.Del(_hashkey);
        }

        /// <summary>
        /// 用户缓存壳 查询缓存，若不存在取原数据并存入缓存
        /// </summary>
        /// <returns>The users list async.</returns>
        /// <param name="userIds">User identifiers.</param>
        public async Task<List<GlobalUserInfo>> GetSetUsersCacheAsync(List<string> userIds)
        {
            string[] fileds = userIds.ToArray();
            GlobalUserInfo[] cacheUsers = await RedisHelper.CacheShellAsync<GlobalUserInfo>(_hashkey, fileds, notCacheFields => GetBeCacheUsersInfoAsync(notCacheFields));
            return cacheUsers.ToList();
        }

        public List<GlobalUserInfo> GetSetUsersCache(List<string> userIds)
        {
            string[] fileds = userIds.ToArray();
            GlobalUserInfo[] cacheUsers = RedisHelper.CacheShell<GlobalUserInfo>(_hashkey, fileds, notCacheFields => GetBeCacheUsersInfo(notCacheFields));
            return cacheUsers.ToList();
        }

        private async Task<(string, GlobalUserInfo)[]> GetBeCacheUsersInfoAsync(string[] userIds)
        {
            var uids = userIds.ToList().Select(a => Guid.Parse(a));
            List<GlobalUserInfo> users = await _dbContext.Set<UserInfo>().AsQueryable().Where(a => uids.Contains(a.UserId)).Select(s => new GlobalUserInfo()
            {
                UserId = s.UserId,
                AvatarUrl = s.AvatarUrl,
                NickName = s.NickName,
                UserName = s.UserName,
                Gender = s.Gender,
                Company = s.Company,
                Position = s.Position,
                BusinessInfo = s.BusinessInfo,
                Industry = s.Industry,
                FieldTags = s.FieldTags,
                Vip = s.Vip,
                CareerAuth = s.CareerAuth,
                IdentityAuth = s.IdentityAuth,
                CareerType = (int)s.CareerType,
                Telephone = s.Telphone
            }).AsNoTracking().ToListAsync();
            (string, GlobalUserInfo)[] ps = new (string, GlobalUserInfo)[users.Count];
            var index = 0;
            foreach (var a in users)
            {
                ps[index++] = (a.UserId.ToString(), a);
            }
            return ps;
        }

        private (string, GlobalUserInfo)[] GetBeCacheUsersInfo(string[] userIds)
        {
            var uids = userIds.ToList().Select(a => Guid.Parse(a));
            List<GlobalUserInfo> users = _dbContext.Set<UserInfo>().AsQueryable().Where(a => uids.Contains(a.UserId)).Select(s => new GlobalUserInfo()
            {
                UserId = s.UserId,
                AvatarUrl = s.AvatarUrl,
                NickName = s.NickName,
                UserName = s.UserName,
                Gender = s.Gender,
                Company = s.Company,
                Position = s.Position,
                BusinessInfo = s.BusinessInfo,
                Industry = s.Industry,
                FieldTags = s.FieldTags,
                Vip = s.Vip,
                CareerAuth = s.CareerAuth,
                IdentityAuth = s.IdentityAuth,
                CareerType = (int)s.CareerType,
                Telephone = s.Telphone
            }).AsNoTracking().ToList();
            (string, GlobalUserInfo)[] ps = new (string, GlobalUserInfo)[users.Count];
            var index = 0;
            foreach (var a in users)
            {
                ps[index++] = (a.UserId.ToString(), a);
            }
            return ps;
        }
    }
}
