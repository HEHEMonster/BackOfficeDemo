using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using StoredProcedureEFCore;


namespace ZDBACKOFFICE.Data
{
    using Microsoft.AspNetCore.Http;
    using ZDBACKOFFICE.Core;
    using ZDBACKOFFICE.Entity.Models;

    public class SystemUserRepo : RepoBase<SystemOperator>, ISystemUserRepo
    {
        private readonly ZDDBContext _zdDBContext;
        private readonly HttpContext _httpContext;


        public SystemUserRepo(ZDDBContext zdDBcontext, IHttpContextAccessor httpContextAccessor) : base(zdDBcontext)
        {
            _zdDBContext = zdDBcontext;
            _httpContext = httpContextAccessor.HttpContext;
        }

        public System.OperatorLoginResult GetSystemOperator(string name, string password)
            => _zdDBContext.SystemOperator
                .Include(x => x.SystemOperatorRole)
                    .ThenInclude(x => x.RoleNavigation)
                    .ThenInclude(x => x.SystemAuthorization)
                    .ThenInclude(x => x.Permission)
                .FirstOrDefault(o => o.Name == name && Hash.Validate(password, o.Password))
                .Map<System.OperatorLoginResult>();

        public IEnumerable<System.Operator> GetSystemOperators(System.Operator.Criteria criteria)
            => _zdDBContext.SystemOperator
                .Include(x => x.SystemOperatorRole)
            //  .Include(x => x.AuditRecords)
                .OrderByDescending(x => x.CreateDate)
                .FilterBy(criteria)
                .MapToList<System.Operator>();

        public ActionResult CreateOperator(string name)
            => TryCatch(db =>
            {
                var op = base.Get(o => o.Name == name.Trim());
                if (op != null) return ActionResult.Bad("登录名已存在!");

                db.LoadStoredProc("dbo.NewPassword")
                    .AddParam("password", out IOutParam<string> outParam, new ParamExtra() { Size = 20 })
                    .ExecNonQuery();
                var password = outParam.Value;

                db.LoadStoredProc("dbo.CreateOperator")
                    .AddParam("name", name)
                    .AddParam("password", Hash.Create(password))
                    .ExecNonQuery();

                return ActionResult.Ok(password);
            });

        /*新增角色*/
        public ActionResult CreateRole(string name, string description)
             => TryCatch(db =>
            {
                var role = _zdDBContext.SystemRoles.FirstOrDefault(x => x.RoleName == name.Trim());
                //var role = base.Get(r => r.Name == name.Trim());
                if (role != null) return ActionResult.Bad("角色已存在");
                db.LoadStoredProc("dbo.CreateRole")
                    .AddParam("name", name)
                    .AddParam("description", description)
                    .ExecNonQuery();
                return ActionResult.Of(true);
            });

        /*开启角色状态 */
        public ActionResult IsEnableRole(System.IsEnableDto dto)
            => TryCatch(db =>
             {
                 var role = _zdDBContext.SystemRoles.FirstOrDefault(x => x.RoleId == dto.Id);
                 if (role == null) return ActionResult.Bad("角色不存在");
                 role.Status = dto.Status == 0 ? 1 : 0;
                 if (db.SaveChanges() <= 0) return ActionResult.Bad("数据异常");
                 return ActionResult.Of(true);
             });

        public IEnumerable<System.Roles> GetSystemRolesList(System.Roles.Criteria criteria)
            => _zdDBContext.SystemRoles
                .Include(x => x.SystemAuthorization)
                .OrderByDescending(x => x.CreateDate)
                .FilterBy(criteria)
                .MapToList<System.Roles>();

        public IEnumerable<System.RoleForAssign> GetAllRolesForAssign()
            => _zdDBContext.SystemRoles.MapToList<System.RoleForAssign>();

        public ActionResult AssignRoles(System.AssignRolesDto dto)
            => TryTransaction(db =>
            {
                var op = base.Get(x => x.OperatorId == dto.OperatorID);
                if (op == null) return ActionResult.Bad("操作员不存在!");

                var beforeRoles = db.SystemOperatorRole.Where(x => x.Operator == dto.OperatorID);
                if (beforeRoles != null)
                    db.SystemOperatorRole.RemoveRange(beforeRoles);

                foreach (var roleID in dto.RoleIDs)
                {
                    db.SystemOperatorRole.Add(new SystemOperatorRole
                    {
                        Role = roleID,
                        Operator = dto.OperatorID
                    });
                }
                var effectRows = db.SaveChanges();
                return ActionResult.Ok(effectRows);
            });

        public IEnumerable<System.PermissionForAssign> GetAllPermissionForAssign()
            => _zdDBContext.SystemPermission.MapToList<System.PermissionForAssign>();

        public ActionResult AssignPermission(System.AssignPermissionDto dto)
            => TryTransaction(db =>
            {
                var role = db.SystemRoles.Find(dto.RoleID);
                if (role == null) return ActionResult.Bad("角色不存在!");

                var beforePermission = db.SystemAuthorization.Where(x => x.RoleId == dto.RoleID);
                if (beforePermission != null)
                    db.SystemAuthorization.RemoveRange(beforePermission);

                foreach (var id in dto.PermissionIDs)
                {
                    db.SystemAuthorization.Add(new SystemAuthorization
                    {
                        RoleId = dto.RoleID,
                        PermissionId = id
                    });
                }
                var effectRows = db.SaveChanges();
                return ActionResult.Ok(effectRows);
            });

        //修改密码
        public ActionResult ChangePassword(System.ChangePasswordDto dto)
            => TryTransaction(db =>
           {
               var userID = _httpContext?.User?.Claims.FirstOrDefault(x => x.Type.Equals("UserID"))?.Value;
               var changePwd = _zdDBContext.SystemOperator.FirstOrDefault(x => x.OperatorId == userID && Hash.Validate(dto.Password, x.Password));
               if (changePwd == null) return ActionResult.Bad("密码错误");
               if (dto.FirstPassword != dto.LastPassword)
               {
                   return ActionResult.Bad("两次输入不一样");
               }
               else if (dto.Password == dto.FirstPassword)
               {
                   return ActionResult.Bad("不能与原密码相同");
               }
               else
               {
                   changePwd.Password = Hash.Create(dto.FirstPassword);
               }
               if (db.SaveChanges() <= 0) return ActionResult.Bad("修改失败");
               return ActionResult.Ok();
           });

        //获取所有操作员

        //方法一
        /*public IEnumerable<System.AllOperator> GetAllOperator()
            =>_zdDBContext.SystemOperator.MapToList<System.AllOperator>();*/

        //方法二
        public IEnumerable<System.Operator> GetAllOperator()
        {
            var SystemOperatorList = ( from op in _zdDBContext.SystemOperator select new System.Operator
            {
                Name = op.Name
            }).ToList();

            return SystemOperatorList;   
        }
    }
}

