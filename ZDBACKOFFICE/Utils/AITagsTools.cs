using System.Text;
using System.Net.Http;
using System.Threading.Tasks;

namespace ZDBACKOFFICE.Web.Utils
{
    public class AITagsTools
    {
        private static ApiConfig _apiConfig;
        private static string actionPath;
        private static string contentType = "application/json";

        public static void SetConfig(ApiConfig apiConfi)
        {
            _apiConfig = apiConfi;
            actionPath = _apiConfig.ApiUrl+"/AI_Actions?action={0}";
        }

        public static async Task<string> GetTagsByApi(string content)
        {
            using (var client = new HttpClient())
            {
                var request = new HttpRequestMessage(HttpMethod.Post,
                 string.Format(actionPath, (int)AITypes.Product));

                request.Headers.Add("token", _apiConfig.AIToken);
                request.Content = new StringContent(content, Encoding.UTF8, contentType);

                var response = await client.SendAsync(request);

                if (!response.IsSuccessStatusCode) return string.Empty;

                return await response.Content.ReadAsStringAsync();
            }
        }
    }

    public class ApiConfig
    {
        public string ApiUrl { get; set; }

        public string AIToken { get; set; }
    }

    public enum AITypes
    {
        Sentiment = 1, // 情感
        Article = 2,   // 文章
        Product = 3,   // 产品
        Moment = 4
    }
}
