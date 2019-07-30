using AutoMapper;

namespace ZDBACKOFFICE.Core
{
    using M = Audit;
    using ZDBACKOFFICE.Entity.Models;
    using ZDBACKOFFICE.Entity.RedisModels;

    public class AuditProfile : Profile
    {
        public AuditProfile()
        {
            CreateMap<UserInfo, GlobalUserInfo>()
                ;

            CreateMap<ActivityInfo, M.Activity>()
             ;

            CreateMap<UserArticle, M.UserArticleList>()
               .ForMember(dest => dest.UserName, opts => opts.MapFrom(src => src.User.UserName))
               .ForMember(dest => dest.Telphone, opts => opts.MapFrom(src => src.User.Telphone))
               //.ForMember(dest => dest.ReportUserName, opts => opts.MapFrom(src => src.Operator.Name))
               ;

            CreateMap<UserIdcard, M.UserIDCard>()
                .ForMember(dest => dest.IdCardNumber, opts => opts.MapFrom(src => src.IdcardNo))
                .ForMember(dest => dest.Phone, opts => opts.MapFrom(src => src.User.Telphone))
                // .ForMember(dest => dest.UserCareer, opts => opts.MapFrom(src => src.User.UserCareer))
                ;

            CreateMap<UserCareer, M.UserCareers>()
                .ForMember(dest => dest.UserName, opts => opts.MapFrom(src => src.User.UserName))
                .ForMember(dest => dest.NickName, opts => opts.MapFrom(src => src.User.NickName))
                ;
            CreateMap<UserProduct, M.UserProduct>()
                .ForMember(dest => dest.UserName, opts => opts.MapFrom(src => src.User.UserName))
                .ForMember(dest => dest.Telphone, opts => opts.MapFrom(src => src.User.Telphone))
                ;

            CreateMap<UserReport, UserFeedBackList>()
                .ForMember(dest => dest.UserName, opts => opts.MapFrom(src => src.User.UserName))
                .ForMember(dest => dest.ReportUserName, opts => opts.MapFrom(src => src.ReportUser.UserName))
                ;

            CreateMap<UserReport, M.UserReport>()
                .ForMember(dest => dest.UserName, opts => opts.MapFrom(src => src.User.UserName))
                .ForMember(dest => dest.ReportUserName, opts => opts.MapFrom(src => src.ReportUser.UserName))
               ;

            CreateMap<ProspectPerson, M.PersonInfo>()
             .ForMember(dest => dest.Operator, opts => opts.MapFrom(src => src.Operator.Name))
                ;

            CreateMap<M.PersonInfo, ProspectPerson>()
                ;
        }
    }
}
