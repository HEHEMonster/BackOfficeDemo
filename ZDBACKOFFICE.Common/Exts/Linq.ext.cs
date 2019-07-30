using System;
using System.Linq;
using System.Linq.Expressions;
using System.Collections.Generic;

namespace ZDBACKOFFICE
{
	public static class extZD
	{
		public static IQueryable<T> PageBy<T, C>(this IQueryable<T> me, C criteria) where C : IPagination
			=> me.Skip((criteria.PageIndex - 1) * criteria.PageSize).Take(criteria.PageSize);

		public static IEnumerable<T> PageBy<T, C>(this IEnumerable<T> me, C criteria) where C : IPagination
			=> criteria.PageIndex > 0 ? me.Skip((criteria.PageIndex - 1) * criteria.PageSize).Take(criteria.PageSize) : me;

		public static IQueryable<T> Sort<T>(this IQueryable<T> me, string propertyName) => Sort(me, propertyName, false);
		public static IQueryable<T> Sort<T>(this IQueryable<T> me, string propertyName, bool desc)
		{
			if (string.IsNullOrEmpty(propertyName))
			{
				return me;
			}
			var param = Expression.Parameter(typeof(T));
			var body = Expression.Property(param, propertyName);
			dynamic keySelector = Expression.Lambda(body, param);
			return desc ? Queryable.OrderByDescending(me, keySelector) : Queryable.OrderBy(me, keySelector);
		}
	}
}
