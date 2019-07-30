using CSRedis;
using Microsoft.EntityFrameworkCore;

namespace ZDRedisCore
{
    using ZDBACKOFFICE.Entity.Models;

    public class ZDTokenCacheService : IZDTokenCacheService
    {
        private CSRedisClient _instance;
        private DbContext _dbContext;
        //private static RedisHelper _redisHelper;
        private const string _hashkey = "hashjwt";
        public ZDTokenCacheService(CSRedisClient cSRedisClient, ZDDBContext zDDBContext)
        {
            _instance = cSRedisClient;
            _dbContext = zDDBContext;
            RedisHelper.Initialization(_instance);
        }

        public string GetTokenCacheByUser(string userId)
        {
            return  RedisHelper.HGet(_hashkey, userId);
        }

        public bool SetTokenCacheByUser(string userId,string jwtStr)
        {
            return  RedisHelper.HSet(_hashkey, userId,jwtStr);
        }

        public long DeleteTokenCacheByUser(string userId)
        {
            return  RedisHelper.HDel(_hashkey, userId);
        }
    }
}
