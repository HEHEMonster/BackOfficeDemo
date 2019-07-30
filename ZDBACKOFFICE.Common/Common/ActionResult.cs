namespace ZDBACKOFFICE
{
    public sealed class ActionResult : IMessage
    {
        public ActionResult() { }

        private ActionResult(bool isSuccess, string message)
        {
            IsSuccess = isSuccess;
            Message = message;
        }

        private ActionResult(bool isSuccess, object result, string message)
        {
            IsSuccess = isSuccess;
            Message = message;
            Result = result;
        }

        public bool IsSuccess { get; private set; } = false;
        public string Message { get; set; }
        public object Result { get; private set; }

        public static ActionResult Of(bool isSuccess, string message = "")
            => new ActionResult(isSuccess, message);

        public static ActionResult Ok()
            => new ActionResult(true, string.Empty);

        public static ActionResult Ok(object result)
            => new ActionResult(true, result, string.Empty);

        public static ActionResult Bad(string message = "")
            => new ActionResult(false, message);

        public static ActionResult Bad(object result, string message = "")
            => new ActionResult(false, result, message);
    }


    public sealed class ActionResult<T> : IMessage where T : class
    {
        public ActionResult() { }

        private ActionResult(bool isSuccess, T result, string message)
        {
            IsSuccess = isSuccess;
            Message = message;
            Result = result;
        }

        public bool IsSuccess { get; private set; } = false;
        public string Message { get; set; }
        public T Result { get; private set; }

        public static ActionResult<T> Ok(T result)
            => new ActionResult<T>(true, result, string.Empty);

        public static ActionResult<T> Bad(T result, string message = "")
            => new ActionResult<T>(false, result, message);
    }
}
