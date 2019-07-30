using System.Collections.Generic;
using Microsoft.Extensions.DependencyInjection;

namespace ZDBACKOFFICE.Web.Services
{
    using CSRedis;
    using ZDBACKOFFICE.Model;

    public static class RedisDIService
    {
        public static void AddRedisClient(this IServiceCollection me, RedisConfig config) 
        {
            var conn = new List<string>();
            foreach (var a in config.Servers)
            {
                conn.Add(a.Host + ":" + a.Port + ",password=" + a.Password + ",poolsize=20,preheat=true,ssl=false,writeBuffer=102400");
            }
            // conn.Add("106.75.245.241:16379,password=ONhC9ji**tO8Q&xW,poolsize=10,preheat=true,ssl=false,writeBuffer=10240");
            me.AddSingleton<CSRedisClient>(option => new CSRedisClient(null, conn.ToArray()));
        }
    }
}
