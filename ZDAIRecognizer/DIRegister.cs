using Microsoft.Extensions.DependencyInjection;

namespace ZDAIRecognizer
{
    public static class ZDAIDIRegister
    {
        public static void AIDIRegister(this IServiceCollection services)
        {
            services.AddTransient(typeof(IIDCardRecognizer), typeof(IDCardRecognizer));
            services.AddTransient(typeof(ICareerRecognizer), typeof(CareerRecognizer));
            services.AddTransient(typeof(INaturalLanguageRecognizer), typeof(NaturalLanguageRecognizer));
            services.AddTransient(typeof(IBankCardRecognizer),typeof(BankCardRecognizer));
            services.AddTransient(typeof(IBaiduNaturalLanguageRecognizer), typeof(BaiduNaturalLanguageRecognizer));
        }
    }
}