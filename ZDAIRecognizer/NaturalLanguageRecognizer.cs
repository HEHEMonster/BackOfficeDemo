using System;
using System.Net;
using Aliyun.Acs.Core;
using Aliyun.Acs.Core.Exceptions;
using Aliyun.Acs.Core.Http;
using Aliyun.Acs.Core.Profile;
using System.Text;
using ZDAIRecognizer.Models;
using Newtonsoft.Json;

namespace ZDAIRecognizer
{
    public partial class NaturalLanguageRecognizer:INaturalLanguageRecognizer
    {
        private static string HOST = "cn-shanghai";

        private static string HOST_DOMAIN = "nlp.cn-shanghai.aliyuncs.com";

        private static string ACCESS_KEY = "LTAIIUNKjYIuJkbH";

        private static string ACCESS_SECRET = "1hz2FFQuDeMxKHzsn52O9LI5atY1er";

        //情感分析
        private static string SENTIMENT = "/nlp/api/sentiment";
        //文档分类
        private static string TEXTSTRUCTURE = "/nlp/api/textstructure";
        //通用实体识别
        private static string ENTITY = "/nlp/api/entity";

        ////电商分类
        //private static string ECOMMERCE = "ecommerce";
        ////新闻分类
        //private static string NEWS = "news";

        /// <summary>
        /// 文档识别 对应电商领域和新闻领域
        /// </summary>
        /// <param name="doucument">Doucument.</param>
        /// <param name="domain">Domain.</param>
        /// <param name="tagFlag">If set to <c>true</c> tag flag.</param>
        public DocumentClassifierModel DocumentClassifier(string doucument, string domain,bool tagFlag=true)
        { 
            string body="{\"text\":\""+doucument+"\",\"tag_flag\":\""+tagFlag.ToString().ToLower()+"\"}";
            try
            {
                CommonResponse response = Recognizer(body, TEXTSTRUCTURE, domain);
                return JsonConvert.DeserializeObject<DocumentClassifierModel>(response.Data);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        /// <summary>
        /// 情感分析
        /// </summary>
        /// <param name="text">Text.</param>
        /// <param name="domain">Domain.</param>
        public SentimentModel SentimentAnalysis(string text, string domain)
        {
            string body = "{\"text\":\"" + text + "\"}";
            try
            {
                CommonResponse response = Recognizer(body, SENTIMENT, domain);
                return JsonConvert.DeserializeObject<SentimentModel>(response.Data);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// 命名实体
        /// </summary>
        /// <returns>The entity analysis.</returns>
        /// <param name="text">Text.</param>
        /// <param name="domain">Domain.</param>
        /// <param name="type">Type.</param>
        public GeneralEntityModel GeneralEntityAnalysis(string text,string domain, string type="full")
        {
            string body = "{\"text\":\"" + text + "\",\"type\":\"" + type + "\"}";
            try
            {
                CommonResponse response = Recognizer(body, ENTITY, domain);
                return JsonConvert.DeserializeObject<GeneralEntityModel>(response.Data);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private static CommonResponse Recognizer(string msg,string product,string domain)
        {
            IClientProfile clientProfile = DefaultProfile.GetProfile(HOST, ACCESS_KEY, ACCESS_SECRET);
            DefaultAcsClient client = new DefaultAcsClient(clientProfile);
            try
            {
                string body= msg;
                string uuid = Guid.NewGuid().ToString();
                CommonRequest request = new CommonRequest();
                request.Domain = HOST_DOMAIN;
                request.Method = MethodType.POST;
                request.UriPattern = product+"/"+domain;//"/nlp/api/sentiment/ecommerce";
                request.AddHeadParameters("x-acs-signature-method", "HMAC-SHA1");
                request.AddHeadParameters("x-acs-signature-nonce", uuid);
                request.AddHeadParameters("x-acs-signature-version", "1.0");
                request.SetContent(Encoding.UTF8.GetBytes(body), "UTF-8", FormatType.JSON);
                CommonResponse response = client.GetCommonResponse(request);
                return response;
            }
            catch (ServerException ex)
            {
                throw ex;
            }
            catch (ClientException ex)
            {
                throw ex;
            }
        }
    }
}
