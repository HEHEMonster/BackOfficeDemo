namespace ZDBACKOFFICE
{
    public interface IActionResult<T> { T ActionResultOf(bool isSuccess, string message); }

    public interface IMessage { string Message { get;  set; } }
}
