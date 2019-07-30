using System;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ZDBACKOFFICE.Core.MongoDBModels
{
    /// <summary>
    /// MongoDB实体类的基类
    /// </summary>
    public class MGBaseEntity
    {
        /// <summary>
        /// 基类对象的ID，MongoDB要求每个实体类必须有的主键
        /// </summary>
        [BsonRepresentation(BsonType.ObjectId)]
        public virtual string Id { get; set; }
    }


    public static class MGExt
    {   
        /// 反射获取需要查询的字段名  
        public static IEnumerable<string> GetModelFields<T>(params Type[] types) where T : class
        {
            var fields = new List<string>();

            foreach (var item in typeof(T).GetProperties())
            {   
                var flag= false;
                foreach (var type in types)
                {
                    if (item.PropertyType == type)
                    {
                        foreach (var prop in type.GetProperties())
                        {
                            fields.Add($"{item.Name}.{prop.Name}");
                        }
                        flag=true;
                        break;
                    }
                }
                if(!flag)fields.Add(item.Name);
            }
            return fields;
        }
    }
}
