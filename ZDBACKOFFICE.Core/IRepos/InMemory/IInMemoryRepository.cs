
using Microsoft.EntityFrameworkCore;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using ZDBACKOFFICE.Entity.Models;

namespace ZDBACKOFFICE.Core
{
    public delegate void otherOperation();
    public interface IInMemoryRepository<T> where T : class
    {
        ZDDBContext DBContext();
        event otherOperation otherOperation;

        T GetById(string id);

        T GetById(int id);
        IList<T> List();
        IList<T> List(Expression<Func<T, bool>> predicate);
        int Insert(T entity);

        int InsertWithOutTransaction(T entity);

        int Delete(T entity);
        int Update(T entity);

        int UpdateWithOutTransaction(T entity);
        DbSet<T> DbSet();
        IList<T> FindList<T>(params Expression<Func<T, bool>>[] where) where T : class;
    }

}
