using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace ZDBACKOFFICE.Data
{
    using ZDBACKOFFICE.Core;
    using ZDBACKOFFICE.Entity.Models;

    public class PersonInfoRepo : RepoBase<ProspectPerson>, IPersonInfoRepo
    {
        private readonly ZDDBContext _zdDBContext;
        private readonly ILoginUserProvider _loginUserProvider;
        public PersonInfoRepo(ZDDBContext zdDBcontext, ILoginUserProvider loginUserProvider) : base(zdDBcontext)
        {
            _zdDBContext = zdDBcontext;
            _loginUserProvider = loginUserProvider;
        }

        /* public IEnumerable<Audit.PersonInfo> GetPersonInfoList(Audit.PersonInfo.Criteria criteria)
         => _zdDBContext.ProspectPerson
                .OrderByDescending(x => x.CreateDate)
                .Include(p => p.Operator)
                .Sort(criteria.SortField, criteria.IsOrderByDesc)
                .FilterBy(criteria)
                .AsNoTracking()
                .MapToList<Audit.PersonInfo>(); */

        public IEnumerable<Audit.PersonInfo> GetPersonInfoList(Audit.PersonInfo.Criteria criteria)
        {
            var personList = (
                from person in _zdDBContext.ProspectPerson.Include(x => x.Operator).FilterBy(criteria,false)
                join record in _zdDBContext.AuditRecord.Include(a => a.Operator)
                on new
                {
                    ID = person.Id.ToString(),
                    AuditType = AuditType.Person.ToValue(),
                    IdNotEqualNull = person.Id.ToString() != null
                }
                equals new
                {
                    ID = record.AuditId,
                    record.AuditType,
                    IdNotEqualNull = true
                }into cr
                from a in cr.DefaultIfEmpty()
                orderby person.CreateDate descending
                select new Audit.PersonInfo
                {
                    Id = person.Id,
                    Person = person.Person,
                    Company = person.Company,
                    Position = person.Position,
                    Industry = person.Industry,
                    Region = person.Region,
                    Address = person.Address,
                    Telphone = person.Telphone,
                    Status = person.Status,
                    Remark = person.Remark,
                    CreateDate = person.CreateDate,
                    UpdateDate = person.UpdateDate,
                    OperatorId = person.OperatorId,
                    Operator = person.Operator.Name,
                    IsContact = (int)person.IsContact ,
                    ContactedState = person.ContactedState,
                    Auditor = a.Operator.Name
                });
                return personList
                    .Sort(criteria.SortField, criteria.IsOrderByDesc)
                    .PaginationBy(criteria)
                    .AsNoTracking()
                    .ToList();
        }

        public ActionResult AddPersonInfo(Audit.PersonAddition dto)
            => TryCatch(db =>
            {
                var person = dto.Map<ProspectPerson>();
                person.CreateDate = DateTime.Now;
                person.UpdateDate = DateTime.Now;
                person.OperatorId = _loginUserProvider.GetUserID();
                base.Insert(person);
                return DBResult(() => db.SaveChanges());
            });

        public ActionResult AuditPersonInfo(Audit.PersonAuditDto dto)
            => TryCatch(db =>
            {
                var person = dto.Map<ProspectPerson>();
                person.UpdateDate = DateTime.Now;
                person.Status = 1;
                db.AuditRecord.Add(new AuditRecord
                {
                    AuditId = person.Id.ToString(),
                    AuditType = (int)AuditType.Person,
                    AuditDate = DateTime.Now,
                    AuditorId = _loginUserProvider.GetUserID(),
                    Remark = dto.Remark,
                    PreStatus = 0,
                    ToStatus = person.Status
                });
                return DBResult(() => UpdateResult(person));
            });

        public ActionResult ImportPersonInfo(IEnumerable<Audit.PersonInfo> personInfos)
        {
            var entities = personInfos.MapToList<ProspectPerson>();
            var operatorId = _loginUserProvider.GetUserID() ?? "0";
            foreach (var entity in entities) { entity.OperatorId = operatorId; }
            return DBResult(() => InsertMultiple(entities));
        }
    }
}