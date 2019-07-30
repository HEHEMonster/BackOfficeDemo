using System.Collections.Generic;

namespace ZDBACKOFFICE.Core
{
    using M = System;

    public interface ISystemUserRepo
    {
        M.OperatorLoginResult GetSystemOperator(string name, string password);
        
        IEnumerable<M.Operator> GetSystemOperators(M.Operator.Criteria criteria);

        IEnumerable<M.Roles> GetSystemRolesList(M.Roles.Criteria criteria);

        ActionResult CreateOperator(string name);

        ActionResult CreateRole(string name,string description);

        ActionResult IsEnableRole(M.IsEnableDto dto);

        IEnumerable<M.RoleForAssign> GetAllRolesForAssign();

        ActionResult AssignRoles(M.AssignRolesDto dto);

        IEnumerable<M.PermissionForAssign> GetAllPermissionForAssign();

        ActionResult AssignPermission(M.AssignPermissionDto dto);

        ActionResult ChangePassword(M.ChangePasswordDto dto);

        IEnumerable<M.Operator> GetAllOperator();
    }
}
