using System;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ZDBACKOFFICE.Core.MongoDBModels
{
    public class Timelines
    {
        public virtual string Id { get; set; }
        public IEnumerable<Moment> Moments { get; set; }
    }

    public class Moment
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public virtual string MomentId { get; set; }
        public int Type { get; set; }
    }
}