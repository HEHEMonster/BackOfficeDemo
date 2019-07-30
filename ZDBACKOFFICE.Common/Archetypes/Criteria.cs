using System;
using System.Linq;
using System.Linq.Expressions;

namespace ZDBACKOFFICE
{
    public abstract class Criteria<T> : Criteria, ICriteria<T>, IPagination, ICriteriaPool<T>
    {
        private IQueryable<T> _source;

        internal ICriteriaPool<T> self => this;

        protected virtual bool OnEarlyBreak() => false;

        protected virtual void OnCollecting() { }
        protected virtual void OnCollected() { }
        protected abstract void OnCollect(ICriteriaPool<T> pool);

        public IQueryable<T> Filter(IQueryable<T> source, bool needPagination = true)
        {
            _source = source;
            OnCollecting();
            if (!OnEarlyBreak())
                OnCollect(self);
            OnCollected();
            if (needPagination)
                return Pagination(_source);
            else
                return _source;
        }

        public IQueryable<T> Pagination(IQueryable<T> source)
        {
            TotalCount = source.Count();
            PageSize = PageSize < 1 ? 20 : PageSize;
            PageIndex = PageIndex < 1 ? 1 : PageIndex;

            return source.Skip(PageSize * (PageIndex - 1)).Take(PageSize);
        }

        ICriteriaPool<T> ICriteriaPool<T>.Add(Expression<Func<T, bool>> predicate)
        {
            _source = _source.Where(predicate); return this;
        }
        
        ICriteriaPool<T> ICriteriaPool<T>.Add(Expression<Func<T, bool>> predicate, bool @if)
            => @if ? ((ICriteriaPool<T>)this).Add(predicate) : this;

        ICriteriaPool<T> ICriteriaPool<T>.With(Action<ICriteriaPool<T>> pipe) { pipe(this); return this; }

    }
}
