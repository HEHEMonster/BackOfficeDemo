namespace ZDAIRecognizer.Models
{
    public class SentimentModel
    {
        public SentimentResult Data {get;set;}
    }

    public class SentimentResult
    { 
        public int Text_Polarity { get; set; }
    }
}
