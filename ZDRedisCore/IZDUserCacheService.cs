using System.Threading.Tasks;
using System.Collections.Generic;

namespace ZDRedisCore
{
    using ZDBACKOFFICE.Entity.RedisModels;

    public interface IZDUserCacheService
    {
        Task<bool> AddUserCacheAsync(GlobalUserInfo user);
        Task<bool> AddUsersCacheAsync(List<GlobalUserInfo> users);
        Task<long> DeleteUserCacheAsync(List<string> userIds);
        Task<GlobalUserInfo> GetCacheUserAsync(string userId);
        Task<List<GlobalUserInfo>> GetUserCacheListAsync(List<string> userIds);

        Dictionary<string, GlobalUserInfo> GetAll();
        long DeleteAll();
        Task<List<GlobalUserInfo>> GetSetUsersCacheAsync(List<string> userIds);
        List<GlobalUserInfo> GetSetUsersCache(List<string> userIds);
    }
}