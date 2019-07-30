using System;
using System.Collections.Generic;

namespace ZDBACKOFFICE.Core
{
    using ZDBACKOFFICE.Entity.Models;

    partial class System
    {
        public class Roles
        {
            public int ID { get; set; }

            public string Name { get; set; }

            public string Description { get; set; }

            public int Status { get; set; }

            public DateTime CreateDate { get; set; }

            public DateTime UpdateDate { get; set; }

            public IEnumerable<int> Permissions { get; set; }

            public class Criteria : Criteria<SystemRoles>
            {
                public string Name { get; set; }

                public int Status { get; set; }

                protected override void OnCollect(ICriteriaPool<SystemRoles> pool)
                {
                    pool.Add(x => x.RoleName == Name, !string.IsNullOrEmpty(Name))
                        .Add(x => x.Status == Status, Status != -1);
                }
            }
        }

        //分配角色
        public class RoleForAssign
        {
            public int ID { get; set; }
            public string Name { get; set; }
        }

        //分配权限
        public class PermissionForAssign
        {
            public int ID { get; set; }
            public string Name { get; set; }
        }

        public class AssignPermissionDto
        {
            public int RoleID { get; set; }

            public List<int> PermissionIDs { get; set; }
        }

        public class CreateRoleDto
        {
            public string Name { get; set; }
            public string Description { get; set; }
            public int Status { get; set; }
        }

        public class IsEnableDto
        {
            public int Id { get; set; }
            public int Status { get; set; }
        }
    }
}
