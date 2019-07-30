using System;
using System.Linq;
using System.Linq.Expressions;

namespace ZDBACKOFFICE.Core
{
    public interface IRepoBase<T> where T:class
    {
        IQueryable<T> GetAllList(Expression<Func<T, bool>> predicate = null);
        T Get(Expression<Func<T, bool>> predicate);
        void Insert(T entity);
        void Delete(T entity);
        void Update(T entity);
        long Count();
    }
}
