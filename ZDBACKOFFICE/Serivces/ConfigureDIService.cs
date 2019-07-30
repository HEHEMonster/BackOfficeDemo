using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace ZDBACKOFFICE.Web.Services
{
    using ZDBACKOFFICE.Model;
    using ZDBACKOFFICE.Web.Utils;
    using ZDBACKOFFICE.Data.Neo4j;

    public static class ConfigureDIService
    {
        public static void AddConfigureService(this IServiceCollection me, IConfiguration configuration)
        {
            me.Configure<Neo4jConfig>(configuration.GetSection("Neo4jConfig"));
            me.Configure<QiNiuYunConfig>(configuration.GetSection("QiNiuYunConfig"));
            me.Configure<RedisConfig>(configuration.GetSection("RedisConfig"));
            me.Configure<JwtBearerConfig>(configuration.GetSection("JwtBearerConfig"));
        }
    }
}
