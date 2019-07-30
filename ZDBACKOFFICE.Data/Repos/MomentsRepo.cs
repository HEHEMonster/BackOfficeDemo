using System;
using System.Linq;
using System.Collections.Generic;
using MongoDB.Driver;
using Newtonsoft.Json;

namespace ZDBACKOFFICE.Data
{

    using ZDRedisCore;
    using ZDBACKOFFICE.Core;
    using ZDBACKOFFICE.Entity.Models;
    using ZDBACKOFFICE.Data.MongoDB;
    using ZDBACKOFFICE.Core.MongoDBModels;

    public class MomentsRepo : RepoBase<UserInfo>, IMomentsRepo
    {
        private readonly ZDDBContext _zdDBContext;
        private readonly IMongoDBBase _mongoDBBase;
        private readonly ITagLibraryRepo _tagLibraryRepo;
        private const string colName = "Moments";

        public MomentsRepo(ZDDBContext zdDBcontext, IMongoDBBase mongoDBBase, ITagLibraryRepo tagLibraryRepo)
            : base(zdDBcontext)
        {
            _zdDBContext = zdDBcontext;
            _mongoDBBase = mongoDBBase;
            _tagLibraryRepo = tagLibraryRepo;
        }

        public IEnumerable<Moments> GetMomentsList(Moments.Citeria criteria)
        {
            var fields = MGExt.GetModelFields<Moments>(typeof(Moments.UserInfo)).ToArray();
            var filter = ComposeConditionsFilter(criteria);
            var sorter = Builders<Moments>.Sort.Descending(x => x.CreateDate);
            var moments = _mongoDBBase.FindListByPage(colName, filter, criteria.PageIndex, criteria.PageSize, out long totalCount, fields, sorter);
            criteria.SetProps(x => x.TotalCount = (int)totalCount);
            return JoinUserInfo(moments);
        }

        private FilterDefinition<Moments> ComposeConditionsFilter(Moments.Citeria criteria)
        {
            // 组合查询条件
            var conditions = new List<FilterDefinition<Moments>>();
            if (!string.IsNullOrEmpty(criteria.UserName)) conditions.Add(Builders<Moments>.Filter.Eq(x => x.User.NickName, criteria.UserName));
            if (criteria.Type != 0) conditions.Add(Builders<Moments>.Filter.Eq(x => x.Type, criteria.Type));
            if (!string.IsNullOrEmpty(criteria.Telphone))
            {
                var userIds = _zdDBContext.UserInfo.Where(x => x.Telphone == criteria.Telphone).Select(x => x.UserId.ToString().ToLower()).ToList();
                if (userIds.Count > 0) conditions.Add(Builders<Moments>.Filter.In(x => x.User.UserId, userIds));
            }
            conditions.Add(Builders<Moments>.Filter.Gte(x => x.CreateDate, criteria.StartDate));
            conditions.Add(Builders<Moments>.Filter.Lte(x => x.CreateDate, criteria.EndDate.AddDays(1)));
            var filter = Builders<Moments>.Filter.Empty;
            if (conditions.Any()) filter = Builders<Moments>.Filter.And(conditions);
            return filter;
        }

        private IEnumerable<Moments> JoinUserInfo(IEnumerable<Moments> moments)
        {
            // MongoDB里没存电话字段所以要根据用户ID去Sql里查
            var userIDs = moments.Select(m => m.User.UserId.ToUpper());
            var users = _zdDBContext.UserInfo.Where(x => userIDs.Contains(x.UserId.ToString())).Select(x => new { x.UserId, x.Telphone });
            moments.Join(users, x => x.User.UserId, y => y.UserId.ToString(), (a, b) =>
            {
                a.Telphone = b.Telphone;
                return a;
            }).ToList();
            return moments;
        }

        public ActionResult DeleteMoment(DeleteMomentsDto model)
        {
            var moment = _mongoDBBase.FindOne<Moments>(colName, model.Id, true, MGExt.GetModelFields<Moments>(typeof(Moments.UserInfo)).ToArray());
            var result = _mongoDBBase.Delete<Moments>(colName, model.Id);
            var filter = Builders<Timelines>.Filter.Eq("Moments.MomentId", model.Id);
            var update = Builders<Timelines>.Update.PullFilter(s => s.Moments, r => r.MomentId == model.Id);
            var timeLines = _mongoDBBase.UpdateManay<Timelines>("TimeLines", filter, update);
            _mongoDBBase.GetClient<Backups>("Backups").InsertOne(new Backups { JsonItem = JsonConvert.SerializeObject(moment), Remark = model.Remark });
            if (result.DeletedCount > 0) return ActionResult.Ok();
            return ActionResult.Bad("删除失败");
        }

        public ActionResult UpdateMomentsTags(UpdateMomentsDto model)
        {
            var filter = Builders<Moments>.Filter.Eq(x => x.Id, model.Id);
            var update = Builders<Moments>.Update.Set(x => x.Tags, model.TagsString);
            var result = _mongoDBBase.UpdateManay<Moments>(colName, filter, update);
            var tags = _tagLibraryRepo.TagSynchronization(model.Tags.ToArray(), TagCategory.Moment.ToValue(), model.Id);
            if (result.ModifiedCount > 0) return ActionResult.Ok();
            return ActionResult.Bad("添加失败");
        }
    }
}
