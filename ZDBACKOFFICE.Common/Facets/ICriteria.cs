using System;
using System.Linq;

namespace ZDBACKOFFICE
{
    public interface ICriteria
    {
        IQueryable<T> Pagination<T>(IQueryable<T> source) where T : class;
    }

    public interface ICriteria<T>
    {
        IQueryable<T> Filter(IQueryable<T> source, bool needPagination = true);
        IQueryable<T> Pagination(IQueryable<T> source);
    }


    public static class ExtCriteria
    {
        public static IQueryable<T> FilterBy<T>(this IQueryable<T> source, ICriteria<T> criteria, bool needPagination = true)
            => criteria.Filter(source, needPagination);

        public static IQueryable<T> PaginationBy<T>(this IQueryable<T> source, ICriteria criteria) where T : class
            => criteria.Pagination(source);

        public static void SetProps(this Criteria criteria, Action<Criteria> action) => action(criteria);
    }
}
