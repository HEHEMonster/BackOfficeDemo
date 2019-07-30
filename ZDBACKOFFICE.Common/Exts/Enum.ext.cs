using System;
using System.Linq;
using System.ComponentModel;

namespace ZDBACKOFFICE
{
    public static class EnumHelper
    {
        public static int ToValue(this Enum me)
        {
            return Convert.ToInt32(me);
        }

        public static T ToEnum<T>(this string me) where T : struct
        {
            if (string.IsNullOrEmpty(me))
            {
                return default(T);
            }
            try
            {
                return (T)Enum.Parse(typeof(T), me, true);
            }
            catch (Exception)
            {
                return default(T);
            }
        }

        public static string ToDescription(this Enum me)
        {
            var attribs = (DescriptionAttribute[])me.GetType().GetField(me.ToString()).GetCustomAttributes(typeof(DescriptionAttribute), false);
            return attribs.Length > 0 ? attribs[0].Description : me.ToString();
        }

        public static string GetDescription(this Type type, int? id)
        {
            var values = from Enum e in Enum.GetValues(type)
                         select new { id = e.ToValue(), name = e.ToDescription() };

            if (!id.HasValue) id = 0;

            try
            {
                return values.ToList().Find(c => c.id == id).name;
            }
            catch
            {
                return "";
            }
        }
    }
}
