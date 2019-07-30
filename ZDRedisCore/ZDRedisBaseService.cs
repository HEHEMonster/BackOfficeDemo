using System;
using System.Collections.Generic;
using CSRedis;

namespace ZDRedisCore
{
    public class ZDRedisBaseServic
    {

        //protected CSRedisClient _conn;

        //private static readonly object LockObj = new object();

        //private void Open(List<string> Connconfig)
        //{
        //    if (_conn != null) return;
        //    lock (LockObj)
        //    {
        //        _conn = _conn ?? new CSRedisClient(null,Connconfig.ToArray());
        //    }
        //}

        //public ZDRedisBaseServic(List<string> Connconfig)
        //{
        //    Open(Connconfig);
        //}

        //#region 释放资源
        ///// <summary>
        ///// 执行与释放或重置非托管资源关联的应用程序定义的任务。
        ///// </summary>
        //public void Dispose()
        //{
        //    _conn.Dispose();
        //}
        //#endregion

    }
}
