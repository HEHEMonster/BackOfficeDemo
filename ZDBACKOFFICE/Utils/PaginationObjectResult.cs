using System;
using Microsoft.AspNetCore.Mvc;

namespace ZDBACKOFFICE.Web
{
    using ZDBACKOFFICE;

    public class PaginationObjectResult<T> : OkObjectResult
    {
        public PaginationObjectResult(IPagination pagnation, object value) : base(new { PageData = value, pagnation.TotalCount })
        {
        }
    }

    public static class PaginationExt
    {
        public static PaginationObjectResult<T> PageOf<T>(this Criteria<T> criteria, object value)
            => new PaginationObjectResult<T>(criteria, value);

        public static PaginationObjectResult<T> PageOf<T>(this T criteria, Func<T, object> func) where T : IPagination
            => new PaginationObjectResult<T>(criteria, func(criteria));
    }
}
