using System;
using System.Collections.Generic;
using System.Text;
using System.Net;
using System.Security.Cryptography.X509Certificates;
using System.Net.Security;
using System.IO;

namespace ZDAIRecognizer
{
   public class BankCardRecognizer: IBankCardRecognizer
    {
        private const string host = "https://yhk.market.alicloudapi.com";
        private const string path = "/rest/160601/ocr/ocr_bank_card.json";
        private const string method = "POST";
        private const string appcode = "c7098036f59a4810a344c07f3a8bcdd6";
        public HttpStatusCode Recognizer(string photoBase64, out string result)
        {
            result = "";
            string querys = "";
            //#图片以base64编码的string
            string bodys = "{\"image\":\"" + photoBase64 + "\"}";
            string url = host + path;
            HttpWebRequest httpRequest = null;
            HttpWebResponse httpResponse = null;

            if (0 < querys.Length)
            {
                url = url + "?" + querys;
            }

            if (host.Contains("https://"))
            {
                ServicePointManager.ServerCertificateValidationCallback = new RemoteCertificateValidationCallback(CheckValidationResult);
                httpRequest = (HttpWebRequest)WebRequest.CreateDefault(new Uri(url));
            }
            else
            {
                httpRequest = (HttpWebRequest)WebRequest.Create(url);
            }
            httpRequest.Method = method;
            httpRequest.Headers.Add("Authorization", "APPCODE " + appcode);
            //根据API的要求，定义相对应的Content-Type
            httpRequest.ContentType = "application/json; charset=UTF-8";
            if (0 < bodys.Length)
            {
                byte[] data = Encoding.UTF8.GetBytes(bodys);
                using (Stream stream = httpRequest.GetRequestStream())
                {
                    stream.Write(data, 0, data.Length);
                }
            }
            try
            {
                httpResponse = (HttpWebResponse)httpRequest.GetResponse();
            }
            catch (WebException ex)
            {
                httpResponse = (HttpWebResponse)ex.Response;
            }

            //解析成功
            Stream st = httpResponse.GetResponseStream();
            using (StreamReader reader = new StreamReader(st, Encoding.UTF8))
            {
                 result = reader.ReadToEnd();
            }
            return httpResponse.StatusCode;
        }

        public  bool CheckValidationResult(object sender, X509Certificate certificate, X509Chain chain, SslPolicyErrors errors)
        {
            return true;
        }
    }
}
