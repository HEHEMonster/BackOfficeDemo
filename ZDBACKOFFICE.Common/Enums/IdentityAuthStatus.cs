namespace ZDBACKOFFICE.Enums
{
    /// <summary>
    /// 身份认证状态
    /// </summary>
    public enum IdentityAuthStatus
    {
        /// <summary>
        /// 认证失败
        /// </summary>
        AuthFailed = -1,
        /// <summary>
        /// 未认证
        /// </summary>
        NoAuth = 0,
        /// <summary>
        /// 已认证
        /// </summary>
        Authed = 1,
        /// <summary>
        /// The be auth.
        /// </summary>
        BeAuth = 2

    }

}
