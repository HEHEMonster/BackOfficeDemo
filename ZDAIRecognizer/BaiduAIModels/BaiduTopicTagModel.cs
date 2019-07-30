using System;
using System.Collections.Generic;

namespace ZDAIRecognizer.BaiduAIModels
{
    public class BaiduTopicTagModel
    {
        public string Log_Id { get; set; }
        public List<TopicTagItem> Items { get; set; }
    }

    public class TopicTagItem
    { 
        public double Score { get; set; }
        public string Tag { get; set; }
    }
}
