using System.Net;

namespace ZDAIRecognizer
{
    public interface ICareerRecognizer
    {
        HttpStatusCode Recognizer(string photoBase64, out string result);
    }
}
