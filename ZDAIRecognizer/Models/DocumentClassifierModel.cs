namespace ZDAIRecognizer.Models
{
    public class DocumentClassifierModel
    {
        public DocumentClassifierResult Data { get; set; }
    }

    public class DocumentClassifierResult
    { 
        public string Tags { get; set; }
        public string Label_Name { get; set; }
    }
}
