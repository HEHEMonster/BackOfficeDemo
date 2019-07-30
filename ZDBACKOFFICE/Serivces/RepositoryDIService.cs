using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;

namespace ZDBACKOFFICE.Web.Services
{
    using ZDBACKOFFICE.Core;
    using ZDBACKOFFICE.Data;
    using ZDBACKOFFICE.Data.MongoDB;
    using ZDBACKOFFICE.Data.Neo4j;
    using ZDBACKOFFICE.Entity.Models;

    public static class RepositoryDIService
    {
        public static void AddRepositoryService(this IServiceCollection me)
        {
            me.AddTransient<INeo4jBase, Neo4jBase>();
            me.AddTransient<IMongoDBBase, MongoDBBase>();
            me.AddTransient<IUserIDCardRepo, UserIDCardRepo>();
            me.AddTransient<IActivityRepo, ActivityRepo>();
            me.AddTransient<IUserCareerRepo, UserCareerRepo>();
            me.AddTransient<ISystemUserRepo, SystemUserRepo>();
            me.AddTransient<ITagLibraryRepo, TagLibraryRepo>();
            me.AddTransient<IUserArticleRepo, UserArticleRepo>();
            me.AddTransient<IUserProductRepo, UserProductRepo>();
            me.AddTransient<ILoginUserProvider, LoginUserProvider>();
            me.AddTransient<IUserFeedBackRepo, UserFeedBackRepo>();
            me.AddTransient<IUserReportRepo, UserReportRepo>();
            me.AddTransient<IPersonInfoRepo, PersonInfoRepo>();
            me.AddTransient<IMomentsRepo, MomentsRepo>();

            me.AddScoped<IInMemoryRepository<ActivityInfo>, InMemoryRepository<ActivityInfo>>();
            me.AddScoped<IInMemoryRepository<UserRefund>, InMemoryRepository<UserRefund>>();
            me.AddScoped<IInMemoryRepository<AuditRecord>, InMemoryRepository<AuditRecord>>();
            me.AddScoped<IInMemoryRepository<UserOrders>, InMemoryRepository<UserOrders>>();
            me.AddScoped<IInMemoryRepository<UserReport>, InMemoryRepository<UserReport>>();
            me.AddScoped<IInMemoryRepository<UserInfo>, InMemoryRepository<UserInfo>>();
            me.AddScoped<IInMemoryRepository<ActivityInfo>, InMemoryRepository<ActivityInfo>>();
            me.AddScoped<IInMemoryRepository<ActivityGuests>, InMemoryRepository<ActivityGuests>>();

            me.AddTransient<IHttpContextAccessor, HttpContextAccessor>();

        }
    }
}
