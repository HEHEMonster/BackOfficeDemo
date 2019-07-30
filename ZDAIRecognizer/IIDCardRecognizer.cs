using System.Net;

namespace ZDAIRecognizer
{
    public interface IIDCardRecognizer
    {
        HttpStatusCode Recognizer(bool isOldFormat, string imgBase64, string side, out string result);
    }
}
