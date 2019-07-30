using System;
using System.Collections.Generic;

namespace ZDAIRecognizer.BaiduAIModels
{
    public class BaiduTopicClassifyModel
    {
        public string Log_Id { get; set; }
        public TopicClassifyItem Item{get;set;}
    }

    public class TopicClassifyItem
    {
        public List<TopicClassifyData> Lv1_Tag_List {get;set;}
        public List<TopicClassifyData> Lv2_Tag_List { get; set; }
    }

    public class TopicClassifyData
    { 
        public double Score { get; set; }
        public string Tag { get; set; }
    }
}
