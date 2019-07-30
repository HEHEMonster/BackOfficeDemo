using System;
using System.Linq;
using System.Reflection;
using System.Linq.Expressions;
using System.Collections.Generic;
using OfficeOpenXml;
using OfficeOpenXml.Style;

namespace ZDBACKOFFICE.Utils
{
    public static class ReflectionHelper
    {
        public static MemberInfo FindProperty(LambdaExpression lambdaExpression)
        {
            Expression expressionToCheck = lambdaExpression;

            var done = false;

            while (!done)
            {
                switch (expressionToCheck.NodeType)
                {
                    case ExpressionType.Convert:
                        expressionToCheck = ((UnaryExpression)expressionToCheck).Operand;
                        break;
                    case ExpressionType.Lambda:
                        expressionToCheck = ((LambdaExpression)expressionToCheck).Body;
                        break;
                    case ExpressionType.MemberAccess:
                        var memberExpression = ((MemberExpression)expressionToCheck);

                        if (memberExpression.Expression.NodeType != ExpressionType.Parameter &&
                          memberExpression.Expression.NodeType != ExpressionType.Convert)
                        {
                            throw new ArgumentException(
                              $"Expression '{lambdaExpression}' must resolve to top-level member and not any child object's properties. Use a custom resolver on the child type or the AfterMap option instead.",
                              nameof(lambdaExpression));
                        }

                        var member = memberExpression.Member;

                        return member;
                    default:
                        done = true;
                        break;
                }
            }

            throw new Exception("Custom configuration for members is only supported for top-level individual members on a type.");
        }
    }

    public class ExcelConfig<TSource>
    {
        public List<Expression<Func<TSource, bool>>> Predicates { get; } = new List<Expression<Func<TSource, bool>>>();
        public List<Expression<Action<ExcelStyle>>> Styles { get; } = new List<Expression<Action<ExcelStyle>>>();
        public List<KeyValuePair<string, string>> MemberMappers { get; } = new List<KeyValuePair<string, string>>();

        public ExcelConfig<TSource> Map<TMember>(Expression<Func<TSource, TMember>> sourceMember, string alias)
        {
            var memberInfo = ReflectionHelper.FindProperty(sourceMember);
            MemberMappers.Add(new KeyValuePair<string, string>(memberInfo.Name, alias));
            return this;
        }
        public ExcelConfig<TSource> Map<TMember>(Expression<Func<TSource, TMember>> sourceMember,
          string alias,
          Expression<Func<TSource, bool>> @if,
          Expression<Action<ExcelStyle>> style)
        {
            var memberInfo = ReflectionHelper.FindProperty(sourceMember);
            MemberMappers.Add(new KeyValuePair<string, string>(memberInfo.Name, alias));

            Predicates.Add(@if);
            Styles.Add(style);
            return this;
        }
    }

    public static class ExtExcel
    {
        public static byte[] ToExcel<T>(this IEnumerable<T> me,
          Action<ExcelConfig<T>> configExp, string sheetName)
          where T : class, new()
        {
            using (var package = me.ToExcelPackage(sheetName, configExp))
            {
                return package.GetAsByteArray();
            }
        }

        public static byte[] ToExcel<T>(this IEnumerable<T> me,
          Action<ExcelConfig<T>> configExp)
          where T : class, new()
          => me.ToExcel(configExp, "sheet1");

        public static byte[] ToExcel<T>(this IEnumerable<T> me) where T : class, new()
          => me.ToExcel(() => typeof(T)
                  .GetProperties(BindingFlags.Instance | BindingFlags.Public)
                  .Select(x => new KeyValuePair<string, string>(x.Name, x.Name)));

        public static byte[] ToExcel<T>(this IEnumerable<T> me,
          Func<IEnumerable<KeyValuePair<string, string>>> headerTitles)
          where T : class, new()
        {
            using (var package = me.ToExcelPackage("sheet1", headerTitles))
            {
                return package.GetAsByteArray();
            }
        }

        public static ExcelPackage ToExcelPackage<T>(this IEnumerable<T> me,
          string sheetName,
          Action<ExcelConfig<T>> configExp)
          where T : class, new()
        {
            var config = new ExcelConfig<T>();
            configExp(config);

            var row = 1;
            var package = new ExcelPackage();
            var header = config.MemberMappers;
            var worksheet = package.Workbook.Worksheets.Add(sheetName);
            worksheet.RowVal(row++, header.Select(x => x.Value).ToArray());//set header

            foreach (var item in me)
            {
                worksheet.RowVal(row++, header.Select(h => item.GetType().GetProperty(h.Key)?.GetValue(item, null)).ToArray());
            }
            return package;
        }

        public static ExcelPackage ToExcelPackage<T>(this IEnumerable<T> me,
          string sheetName,
          Func<IEnumerable<KeyValuePair<string, string>>> headerTitles)
          where T : class, new()
        {
            var row = 1;
            var package = new ExcelPackage();
            var header = headerTitles();
            var worksheet = package.Workbook.Worksheets.Add(sheetName);
            worksheet.RowVal(row++, header.Select(x => x.Value).ToArray());//set header

            foreach (var item in me)
            {
                worksheet.RowVal(row++, header.Select(h => item.GetType().GetProperty(h.Key)?.GetValue(item, null)).ToArray());
            }
            return package;
        }

        public static void ToSheet<T>(this IEnumerable<T> me
            , ExcelPackage package
            , string sheetName
            , Action<ExcelConfig<T>> configExp
            , IDictionary<int, object[]> initRows = null
            , IEnumerable<string> mergeCells = null)
          where T : class, new()
        {
            var config = new ExcelConfig<T>();
            configExp(config);

            var header = config.MemberMappers;
            var worksheet = package.Workbook.Worksheets.Add(sheetName);
            int headerRow = 1;

            if (initRows != null)
            {
                foreach (var row in initRows)
                {
                    worksheet.RowVal(row.Key, row.Value);
                    headerRow++;
                }
            }

            worksheet.RowVal(headerRow++, header.Select(x => x.Value).ToArray());//set header
            foreach (var item in me)
            {
                worksheet.RowVal(headerRow++, header.Select(h => item.GetType().GetProperty(h.Key)?.GetValue(item, null)).ToArray());
            }

            if (mergeCells != null)
            {
                foreach (var item in mergeCells)
                {
                    worksheet.Cells[item].Merge = true;
                }
            }
        }

        public static ExcelWorksheet CellVal(this ExcelWorksheet me, int row, int col, object value)
        {
            if (value?.GetType() == typeof(DateTime))
            {
                me.Cells[row, col].Style.Numberformat.Format = "yyyy-MM-dd hh:mm:ss";
            }
            me.Cells[row, col].Value = value;
            return me;
        }

        public static ExcelWorksheet RowVal(this ExcelWorksheet me, int rowIndex, params object[] values)
        {
            int columnIndex = 1;
            foreach (var item in values)
            {
                me.CellVal(rowIndex, columnIndex++, item);
            }
            return me;
        }
    }
}
