using System;
using System.IO;
using System.Collections.Generic;
using NPOI.HSSF.UserModel;
using NPOI.SS.UserModel;
using NPOI.XSSF.UserModel;

namespace ZDBACKOFFICE.Utils
{
    public static class ExcelImportHelper
    {
        private const int maxCount = 10000;

        public static IEnumerable<T> ConvertExcel<T>(string excelFilePath, Func<IRow, T> func, int startRowNum)
            => ConvertExcel(new FileStream(excelFilePath, FileMode.Open, FileAccess.Read), func, startRowNum);

        private static IEnumerable<T> ConvertExcel<T>(Stream stream, Func<IRow, T> func, int startRowNum)
        {
            var list = new List<T>();
            IWorkbook wk;
            try
            {
                wk = new XSSFWorkbook(stream);
            }
            catch (Exception)
            {
                wk = new HSSFWorkbook(stream);
            }
            var sheet = wk.GetSheetAt(0);

            for (var i = startRowNum; i <= sheet.LastRowNum; i++)
            {
                var row = sheet.GetRow(i);
                if (row == null) continue;
                var temp = func(row);
                if (temp != null)
                list.Add(temp);
            }
            stream.Close();
            wk.Close();
            return list;
        }

        public static string GetCell(this IRow row, string clounmName)
        {
            var firstRow = row.Sheet.GetRow(0);
            for (var i = 0; i < firstRow.PhysicalNumberOfCells; i++)
            {
                if (firstRow.GetCell(i).ToString() == clounmName)
                {
                    return row.GetCell(i)?.ToString();
                }
            }
            throw new Exception($"未找到名为'{clounmName}'的列头");
        }

        public static string DatetimeFormart(this ICell cell, string formart)
        {
            var value = cell?.ToString();
            if (!string.IsNullOrEmpty(value))
            {
                return Convert.ToDateTime(value).ToString(formart);
            }
            return value;
        }

    }

}
