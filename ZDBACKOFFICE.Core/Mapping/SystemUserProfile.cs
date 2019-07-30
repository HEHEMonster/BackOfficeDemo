using AutoMapper;
using System.Linq;

namespace ZDBACKOFFICE.Core
{
    using M = System;
    using ZDBACKOFFICE.Entity.Models;

    public class SystemUserProfile : Profile
    {
        public SystemUserProfile()
        {
            CreateMap<SystemOperator, M.OperatorLoginResult>()
                .ForMember(dest => dest.RoleIDs, opts => opts.MapFrom(src => src.SystemOperatorRole.Select(x => x.RoleNavigation.RoleId)))
                .ForMember(dest => dest.RoleNames, opts => opts.MapFrom(src => src.SystemOperatorRole.Select(x => x.RoleNavigation.RoleName)))
                .ForMember(dest => dest.PermissionNames,
                    opts => opts.MapFrom(src => src.SystemOperatorRole
                    .Where(x => x.RoleNavigation.Status != 0)
                    .Select(x => x.RoleNavigation.SystemAuthorization.Select(y => y.Permission.PermissionName))))
                    ;

            CreateMap<SystemOperator, M.Operator>()
                .ForMember(dest => dest.Roles, opts => opts.MapFrom(src => src.SystemOperatorRole.Select(x => x.Role)))
                 // .ForMember(dest => dest.AuditRecords, opts => opts.MapFrom(src => src.AuditRecords))
               ;

            CreateMap<SystemRoles, M.RoleForAssign>()
                .ForMember(dest => dest.ID, opts => opts.MapFrom(src => src.RoleId))
                .ForMember(dest => dest.Name, opts => opts.MapFrom(src => src.RoleName))
                ;

            CreateMap<SystemRoles, M.Roles>()
                .ForMember(dest => dest.ID, opts => opts.MapFrom(src => src.RoleId))
                .ForMember(dest => dest.Name, opts => opts.MapFrom(src => src.RoleName))
                .ForMember(dest => dest.Permissions, opts => opts.MapFrom(src => src.SystemAuthorization.Select(x => x.PermissionId)))
                ;

            CreateMap<SystemPermission, M.PermissionForAssign>()
                .ForMember(dest => dest.ID, opts => opts.MapFrom(src => src.Id))
                .ForMember(dest => dest.Name, opts => opts.MapFrom(src => src.PermissionName))
                ;

        }
    }
}
