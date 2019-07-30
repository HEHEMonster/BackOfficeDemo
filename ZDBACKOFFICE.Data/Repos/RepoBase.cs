using System;
using System.Linq;
using System.Linq.Expressions;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace ZDBACKOFFICE.Data
{
    using ZDBACKOFFICE.Core;
    using ZDBACKOFFICE.Entity.Models;

    public class RepoBase<T> : IRepoBase<T> where T : class
    {
        private readonly ZDDBContext _zdDBContext;
        private readonly DbSet<T> _dbSet;

        public RepoBase(ZDDBContext zdDBcontext)
        {
            _zdDBContext = zdDBcontext;
            _dbSet = _zdDBContext.Set<T>();
        }

        public long Count()
        {
            return _dbSet.LongCount();
        }

        public void Delete(T entity)
        {
            _dbSet.Remove(entity);
        }
        public T Get(int id)
        {
            return _dbSet.Find(id);
        }

        public T Get(Expression<Func<T, bool>> predicate)
        {
            return _dbSet.FirstOrDefault(predicate);
        }

        public T Get(Guid id)
        {
            return _dbSet.Find(id);
        }

        public IQueryable<T> GetAllList(Expression<Func<T, bool>> predicate = null)
        {
            if (predicate == null)
            {
                return _dbSet;
            }
            return _dbSet.Where(predicate);
        }

        public void Insert(T entity)
        {
            _dbSet.Add(entity);
        }

        public int InsertMultiple(IEnumerable<T> entities)
        {
            _dbSet.AddRange(entities);
            return _zdDBContext.SaveChanges(); 
        }

        public void Update(T entity)
        {
            _dbSet.Attach(entity);
            _zdDBContext.Entry(entity).State = EntityState.Modified;
            _zdDBContext.SaveChanges();
        }
        public int UpdateResult(T entity)
        {
            _dbSet.Attach(entity);
            _zdDBContext.Entry(entity).State = EntityState.Modified;
            return _zdDBContext.SaveChanges();


        }
        public R TryTransaction<R>(Func<ZDDBContext, R> func) where R : IMessage, new()
        {
            using (var transaction = _zdDBContext.Database.BeginTransaction())
            {
                try
                {
                    var restult = func(_zdDBContext);
                    transaction.Commit();
                    return restult;
                }
                catch (Exception ex)
                {
                    return new R
                    {
                        Message = ex.Message
                    };
                }
            }
        }

        public R TryCatch<R>(Func<ZDDBContext, R> func) where R : IMessage, new()
        {
            try
            {
                var restult = func(_zdDBContext);
                return restult;
            }
            catch (Exception ex)
            {
                return new R
                {
                    Message = ex.Message
                };
            }
        }

        public ActionResult DBResult(Func<int> func)
        {
             if (func() > 0) return ActionResult.Ok();
            return ActionResult.Bad();
        }
    }
}
