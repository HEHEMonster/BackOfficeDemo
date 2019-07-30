namespace ZDAIRecognizer
{
    public class Const
    {
        public class Domain
        {
            //电商分类
            public static string ECOMMERCE = "ecommerce";
            //新闻分类
            public static string NEWS = "news";
        }

        /// <summary>
        /// 控制输出样式，其值可为”simple”或者”full”，分别表示简单输出和详细输出，简单输出包括实体和标签，详细输出包括实体、标签、权重和近义词。
        /// </summary>
        public class EntityAnalysisType
        {
            public static string FULL = "full";
            public static string SIMPLE = "simple";
        }
    }
}
