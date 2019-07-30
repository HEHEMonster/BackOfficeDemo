using System;
using System.Collections.Generic;

namespace ZDBACKOFFICE.Core
{
    using ZDBACKOFFICE.Entity.Models;

    partial class System
    {
        public class OperatorLoginResult
        {
            public string OperatorID { get; set; }
            public string Name { get; set; }
            public string Token { get; set; }
            public IEnumerable<int> RoleIDs { get; set; }
            public IEnumerable<string> RoleNames { get; set; }
            public IEnumerable<int> PermissionIDs { get; set; }
            public IEnumerable<IEnumerable<string>> PermissionNames { get; set; }
        }

        public class Operator
        {
            public string OperatorID { get; set; }
            public string Name { get; set; }
            // public string Password { get; set; }

            public DateTime CreateDate { get; set; }
            // public DateTime UpdateDate { get; set; }

            public int Status { get; set; }
            public IEnumerable<int> Roles { get; set; }
            // public IEnumerable<AuditRecord> AuditRecords { get; set; }

            public class Criteria : Criteria<SystemOperator>
            {
                public string Name { get; set; }
                public int Status { get; set; }

                protected override void OnCollect(ICriteriaPool<SystemOperator> pool)
                {
                    pool.Add(x => x.Name == Name, !string.IsNullOrEmpty(Name))
                        .Add(x => x.Status == Status, Status != -1);
                }
            }
        }

        public class AssignRolesDto
        {
            public string OperatorID { get; set; }

            public List<int> RoleIDs { get; set; }
        }

        public class ChangePasswordDto
        {
            public string Password{ get; set; }

            public string FirstPassword{ get; set; }

            public string LastPassword { get; set; }

        }

    }
}
