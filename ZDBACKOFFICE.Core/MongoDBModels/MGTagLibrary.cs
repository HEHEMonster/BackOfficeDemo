using System;
using System.Collections.Generic;
using MongoDB.Bson.Serialization.Attributes;

namespace ZDBACKOFFICE.Core.MongoDBModels
{
    public class MGTagLibrary:MGBaseEntity
    {
        public string Tag { get; set; }

        public List<Obj> Objs { get; set; }
    }

    public class Obj
    {
        /// <summary>
        /// 文章或产品或生意圈 ID
        /// </summary>
        /// <value>The identifier.</value>
        public string Id { get; set; }
        /// <summary>
        /// 类型
        /// </summary>
        /// <value>The type.</value>
        public int Type { get; set; }
        /// <summary>
        /// 状态
        /// </summary>
        /// <value>The status.</value>
        public int Status { get; set; }
    }
}
