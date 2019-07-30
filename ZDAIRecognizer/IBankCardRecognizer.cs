using System;
using System.Collections.Generic;
using System.Net;
using System.Text;

namespace ZDAIRecognizer
{
    public interface IBankCardRecognizer
    {
         HttpStatusCode Recognizer(string photoBase64, out string result);
    }
}
