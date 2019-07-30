using System;
using System.Collections.Generic;
using Baidu.Aip;
using Newtonsoft.Json;
using ZDAIRecognizer.BaiduAIModels;

namespace ZDAIRecognizer
{
    public class BaiduNaturalLanguageRecognizer : IBaiduNaturalLanguageRecognizer
    {
        // private static string APP_ID = "15270988";
        private static string APP_KEY = "IEoPRRZ4sKytSFffE3GXRBxg";
        private static string SECRET_KEY = "ksUCD0RfyEfmSXGagKX2m8R8wGaHOGfv";
        private static int TIME_OUT = 60000;

        public BaiduEmotionModel Emotion(string text)
        {
            var client = new Baidu.Aip.Nlp.Nlp(APP_KEY, SECRET_KEY);
            client.Timeout = TIME_OUT;
            var options = new Dictionary<string, object>{
                {"scene", "talk"}
            };
            try
            {
                var result = client.Emotion(text, options);
                return result.ToObject<BaiduEmotionModel>();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public BaiduTopicClassifyModel TopicClassify(string title, string content)
        {
            var client = new Baidu.Aip.Nlp.Nlp(APP_KEY, SECRET_KEY);
            client.Timeout = TIME_OUT;
            try
            {
                var result = client.Topic(title, content);
                return result.ToObject<BaiduTopicClassifyModel>();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public BaiduTopicTagModel TopicTag(string title, string content)
        {
            if (string.IsNullOrEmpty(title) || string.IsNullOrEmpty(content))
                throw new Exception("标题和内容为空");

            var client = new Baidu.Aip.Nlp.Nlp(APP_KEY, SECRET_KEY);
            client.Timeout = TIME_OUT;
            try
            {
                var result = client.Keyword(title, content);
                return result.ToObject<BaiduTopicTagModel>();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
