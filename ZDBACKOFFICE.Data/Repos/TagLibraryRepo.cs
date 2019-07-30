using System;
using ZDBACKOFFICE.Data.MongoDB;
using ZDBACKOFFICE.Core.MongoDBModels;
using MongoDB.Driver;

namespace ZDBACKOFFICE.Data
{
    using ZDBACKOFFICE.Core;
    public class TagLibraryRepo : ITagLibraryRepo
    {
        private readonly IMongoDBBase _mongoDBBase;
        private static string _TagLibrary = "TagLibrary";
        public TagLibraryRepo(IMongoDBBase mongoDBBase)
        {
            _mongoDBBase = mongoDBBase;
        }

        /// <summary>
        /// 同步标签库，同步前会删除原有已存在的标签，再新增标签关系
        /// </summary>
        /// <returns>The tag.同步的记录数</returns>
        /// <param name="tags">Tags.</param>
        /// <param name="type">Type.</param>
        /// <param name="objId">Object identifier.</param>
        public long TagSynchronization(string[] tags, int type, string objId)
        {
            try
            {
                FilterDefinition<MGTagLibrary> Deletefilter = Builders<MGTagLibrary>.Filter.Empty;
                UpdateDefinition<MGTagLibrary> Deleteupdate = Builders<MGTagLibrary>.Update.PullFilter(s => s.Objs, r => r.Id == objId.ToLower());
                _mongoDBBase.GetClient<MGTagLibrary>(_TagLibrary).UpdateMany(Deletefilter, Deleteupdate);
                FilterDefinition<MGTagLibrary> filter = Builders<MGTagLibrary>.Filter.Empty;
                UpdateDefinition<MGTagLibrary> update;
                UpdateOptions option = new UpdateOptions
                {
                    IsUpsert = true
                };
                int count = 0;
                foreach (var tag in tags)
                {
                    filter = Builders<MGTagLibrary>.Filter.Eq(a => a.Tag, tag);
                    update = Builders<MGTagLibrary>.Update.Push(s => s.Objs, new Obj() { Id = objId.ToLower(), Type = type, Status = 1 });
                    var result = _mongoDBBase.GetClient<MGTagLibrary>(_TagLibrary).UpdateMany(filter, update, option);
                    count += result.UpsertedId == null ? 0 : 1;
                }
                return count;
            }
            catch (Exception ex)
            {
                throw new Exception($"MongoDB 标签同步失败, {ex.Message}");
            }
        }
    }
}
