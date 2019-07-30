using System.Linq;

namespace ZDBACKOFFICE
{
    public abstract class Criteria : ICriteria, IPagination
    {
        public int PageIndex { get; set; } = 1;
        public int PageSize { get; set; } = 20;
        public int TotalCount { get; set; }
        public virtual string SortField { get; set; }
        public virtual string SortOrder { get; set; }

        public bool IsOrderByDesc => SortOrder == "descend";
        

        public IQueryable<T> Pagination<T>(IQueryable<T> source) where T : class
        {
            TotalCount = source.Count();
            PageSize = PageSize < 1 ? 20 : PageSize;
            PageIndex = PageIndex < 1 ? 1 : PageIndex;

            return source.Skip(PageSize * (PageIndex - 1)).Take(PageSize);
        }
    }
}