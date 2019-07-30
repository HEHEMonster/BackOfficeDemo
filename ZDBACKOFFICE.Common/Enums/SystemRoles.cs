namespace ZDBACKOFFICE
{
    /// <summary>
    /// 系统角色 (与system_roles roleID对应)
    /// </summary>
    public enum SystemRoles
    {
        /// <summary>
        /// 管理员
        /// </summary>
        Admin = 3,
        /// <summary>
        /// 图文
        /// </summary>
        Article_Auditor = 6,
        /// <summary>
        /// 活动管理员
        /// </summary>
        Activity_Manager = 8,
        /// <summary>
        /// 退款审核员
        /// </summary>
        Refund_Auditor = 11,
        /// <summary>
        /// 身份证审核员
        /// </summary>
        IDCard_Auditor = 12,
        /// <summary>
        /// 名片审核员
        /// </summary>
        Career_Auditor = 15,
        /// <summary>
        /// 产品审核员
        /// </summary>
        Product_Auditor = 16
    }
}

