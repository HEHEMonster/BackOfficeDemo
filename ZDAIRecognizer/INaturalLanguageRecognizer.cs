using System.Net;
using System.Threading.Tasks;
using ZDAIRecognizer.Models;

namespace ZDAIRecognizer
{
    public interface INaturalLanguageRecognizer
    {
        DocumentClassifierModel DocumentClassifier(string doucument, string domain, bool tagFlag = true);
        SentimentModel SentimentAnalysis(string text, string domain);
        GeneralEntityModel GeneralEntityAnalysis(string text, string domain, string type = "full");
    }
}
