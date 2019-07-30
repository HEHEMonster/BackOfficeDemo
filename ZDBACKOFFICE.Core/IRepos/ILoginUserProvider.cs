using System.Threading.Tasks;

namespace ZDBACKOFFICE.Core
{
    public interface ILoginUserProvider
    {
        string GetUserID();

        Task<System.OperatorLoginResult> Login(string username, string password);

        System.OperatorLoginResult Authenticate(string username, string password);
    }
}
