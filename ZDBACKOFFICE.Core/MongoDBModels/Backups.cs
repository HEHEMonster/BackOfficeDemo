using System;
using System.Collections.Generic;

namespace ZDBACKOFFICE.Core.MongoDBModels
{
    public class Backups : MGBaseEntity
    {
        public string JsonItem { get; set; }
        public string Remark { get; set; }
    }
}