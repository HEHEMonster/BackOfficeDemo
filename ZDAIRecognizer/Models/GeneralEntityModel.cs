using System.Collections.Generic;

namespace ZDAIRecognizer.Models
{
    public class GeneralEntityModel
    {
       public List<GeneralEntityResult> Data { get; set; }
    }

    public class GeneralEntityResult
    { 
        public string Synonym { get; set; }
        public string Tag { get; set; }
        public string Weight { get; set; }
        public string Word { get; set; }
    }
}
