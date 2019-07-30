using System;
using Microsoft.Extensions.DependencyInjection;

namespace ZDRedisCore
{
    public static class ZDRedisCoreDIRegister
    {
        public static void RedisDIRegister(this IServiceCollection services)
        {
            services.AddTransient(typeof(IZDUserCacheService), typeof(ZDUserCacheService));
            services.AddTransient(typeof(IZDTokenCacheService), typeof(ZDTokenCacheService));
        }
    }
}
