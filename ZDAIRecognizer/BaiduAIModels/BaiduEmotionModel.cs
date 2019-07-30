using System;
using System.Collections.Generic;

namespace ZDAIRecognizer.BaiduAIModels
{
    public class BaiduEmotionModel
    {
        public string Log_Id { get; set; }
        public string Text { get; set; }
        public List<EmotionItem> Items { get; set; }
    }

    public class EmotionItem
    { 
        public double Prob { get; set; }
        public string Label { get; set; }
    }
}
