namespace ZDBACKOFFICE
{
    /// <summary>
    /// 审核状态
    /// </summary>
    public enum AuditStatus
    {   
        // 全部
        All = -2,
        // 审核未通过
        NoPass = -1,
        // 审核中
        Auditing = 0,
        // 审核通过
        Pass = 1
    }
}

