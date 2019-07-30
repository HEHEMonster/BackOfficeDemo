namespace ZDBACKOFFICE.Model
{
    public class JwtBearerConfig
    {
        public string Secret { get; set; }
        public string Issuer { get; set; }
        public string Audience { get; set; }
    }
}