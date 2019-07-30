using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using AutoMapper;
using IdentityModel;
using Newtonsoft.Json;

namespace ZDBACKOFFICE
{
    using ZDBACKOFFICE.Core;
    using ZDBACKOFFICE.Model;
    using ZDBACKOFFICE.Data.MongoDB;
    using ZDBACKOFFICE.Entity.Models;
    using ZDBACKOFFICE.Web.Services;
    using ZDAIRecognizer;
    using ZDRedisCore;

    public class Startup
    {
        private readonly ILogger _logger;
        private readonly ILoggerFactory _loggerFactory;
        public Startup(IConfiguration configuration, ILoggerFactory loggerFactory)
        {
            Configuration = configuration;
            _logger = loggerFactory.CreateLogger(typeof(Startup));
            _loggerFactory = loggerFactory;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors();
            services.AddMvc()
              .SetCompatibilityVersion(CompatibilityVersion.Version_2_1)
              .AddJsonOptions(options =>
              {
                  options.SerializerSettings.MaxDepth = 2;
                  options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                  // options.SerializerSettings.ContractResolver = new DefaultContractResolver();
                  // options.SerializerSettings.DateFormatString = "yyyy-MM-dd";
              });

            // 分布式缓存
            services.AddDistributedMemoryCache();
            services.AddSession();

            services.AddDbContextPool<ZDDBContext>(option =>
            {
                option.UseSqlServer(Configuration.GetConnectionString("SqlServerConection"));
                // .UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
                option.UseLoggerFactory(_loggerFactory);
            });

            MongodbHost mongoDBConn = new MongodbHost();
            Configuration.GetSection("MongoDB").Bind(mongoDBConn);
            services.AddTransient<MongoDataBaseContext>(option =>
            {
                return new MongoDataBaseContext(mongoDBConn);
            });

            RedisConfig redisConfig = new RedisConfig();
            Configuration.GetSection("RedisConfig").Bind(redisConfig);
            services.AddRedisClient(redisConfig);

            // 仓储注入都写在这里
            services.AddRepositoryService();
            _logger.LogInformation("Add Repo Services to service");
            // appsetting配置注入在这里
            services.AddConfigureService(Configuration);
            _logger.LogInformation("Add Configure Services to service");

            // Cookie验证
            // services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme).AddCookie(option =>
            // {
            //    option.LoginPath = "/api/account/login";
            // });

            // services.AddAuthorization(options =>
            // {
            //     options.AddPolicy(Permission.ArticleAudit, policy => policy.AddRequirements(new Authorization.PermissionAuthorizationRequirement(Permission.ArticleAudit)));
            //     options.AddPolicy("AdminOnly", policy => policy.RequireRole("admin"));                       //基于角色授权
            //     options.AddPolicy("ClaimAuthorization", policy => policy.RequireClaim("claimType", "value1", "value2")); //基于Claim授权
            // });

            // JWT验证 
            JwtBearerConfig jwtBearerConfig = new JwtBearerConfig();
            Configuration.GetSection("JwtBearerConfig").Bind(jwtBearerConfig);
            services.AddAuthentication(option =>
            {
                option.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                option.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(option =>
            {
                // 自定义token获取方式
                // option.Events = new JwtBearerEvents()
                // {
                //     OnMessageReceived = context => 
                //     { 
                //         context.Token= context.Request.Cookies["access_token"];
                //         return Task.CompletedTask;
                //     }
                // };
                option.SaveToken = true;
                option.RequireHttpsMetadata = false;
                option.TokenValidationParameters = new TokenValidationParameters
                {
                    NameClaimType = JwtClaimTypes.Name,
                    // RoleClaimType = JwtClaimTypes.Role,
                    ValidIssuer = jwtBearerConfig.Issuer,
                    ValidAudience = jwtBearerConfig.Audience,
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(jwtBearerConfig.Secret))
                };
            });

            services.AIDIRegister();
            services.RedisDIRegister();

            Mapper.Initialize(cfg =>
            {
                cfg.AddProfile<AuditProfile>();
                cfg.AddProfile<SystemUserProfile>();
            });

            services.AddLogging(builder =>
            {
                builder.ClearProviders();
                builder.AddConfiguration(Configuration.GetSection("Logging"))
                .AddFilter("Microsoft", LogLevel.Warning)
                .AddConsole();
            });

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });

            // services.AddSingleton<Microsoft.AspNetCore.Authorization.IAuthorizationHandler, Authorization.PermissionHandler>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseDatabaseErrorPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.UseCors(x => x
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader());

            // app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();
            app.UseSession();
            app.UseAuthentication();

            app.UseMvc();

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    // spa.UseReactDevelopmentServer(npmScript: "start");
                    spa.UseProxyToSpaDevelopmentServer("http://localhost:3000");
                }
            });
        }
    }
}
