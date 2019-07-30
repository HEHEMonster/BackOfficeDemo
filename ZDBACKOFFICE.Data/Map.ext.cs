using System.Linq;
using System.Collections.Generic;
using AutoMapper;

namespace ZDBACKOFFICE.Data
{
    public static partial class extMapper
    {
        public static T Map<T>(this object me) => Mapper.Map<T>(me);
        public static T MapFirst<T>(this IQueryable<object> me) => me.FirstOrDefault().Map<T>();
        public static T MapFirst<T>(this IEnumerable<object> me) => me.FirstOrDefault().Map<T>();

        public static IList<T> MapToList<T>(this IQueryable<object> me) => MapToList<T>(me.AsEnumerable());
        public static IList<T> MapToList<T>(this IEnumerable<object> me) => Map<T>(me).ToList();

        public static IEnumerable<T> Map<T>(this IQueryable<object> me) => Map<T>(me.AsEnumerable());
        public static IEnumerable<T> Map<T>(this IEnumerable<object> me) => me.Select(Mapper.Map<T>);


        public static R MapTo<T, R>(this T source) where T : class where R : class
        {
            if (source == null) return default(R);
            var config = new MapperConfiguration(cfg => cfg.CreateMap<T,R>());
            var mapper = config.CreateMapper();
            return mapper.Map<R>(source);
        }

        public static IEnumerable<R> MapToList<T, R>(this IEnumerable<T> source)where T : class where R : class
        {
            if (source == null) return new List<R>();
            var config = new MapperConfiguration(cfg => cfg.CreateMap<T, R>());
            var mapper = config.CreateMapper();
            return mapper.Map<List<R>>(source);
        }
    }
}
