namespace ZDBACKOFFICE
{
    /// <summary>
    /// 审核功能类型
    /// </summary>
    
    public enum AuditType
    {
        /// <summary>
        /// 文章审核
        /// </summary>
        Article = 1,

        /// <summary>
        /// 身份证审核
        /// </summary>
        IDCard = 2,

        /// <summary>
        /// 名片审核
        /// </summary>
        Career = 3,

        /// <summary>
        /// 产品审核
        /// </summary>
        Product = 4,

        /// <summary>
        /// 退款审核
        /// </summary>
        Refund = 5,

         /// <summary>
        /// 客户审核
        /// </summary>
        Person = 6,
    }
}