namespace ZDRedisCore
{
    public interface IZDTokenCacheService
    {
        string GetTokenCacheByUser(string userId);
        bool SetTokenCacheByUser(string userId, string jwtStr);
        long DeleteTokenCacheByUser(string userId);
    }
}