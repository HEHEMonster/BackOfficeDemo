using ZDAIRecognizer.BaiduAIModels;

namespace ZDAIRecognizer
{
    public interface IBaiduNaturalLanguageRecognizer
    {
        BaiduEmotionModel Emotion(string text);
        BaiduTopicClassifyModel TopicClassify(string title, string content);
        BaiduTopicTagModel TopicTag(string title, string content);
    }
}