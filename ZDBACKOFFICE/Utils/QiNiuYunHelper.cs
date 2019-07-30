namespace ZDBACKOFFICE.Web.Utils
{
    using Qiniu.Util;
    using Qiniu.IO.Model;
    using Qiniu.IO;
    using Qiniu.Http;
    using Microsoft.AspNetCore.Http;
    using System.IO;
    using Microsoft.Extensions.Options;

    public class QiNiuYunHelper
    {
        private static QiNiuYunConfig _qiniuyunconfig;
        public QiNiuYunHelper(IOptions<QiNiuYunConfig> config)
        {
            //_activityInfoRepo = activityInfoRepo;
            _qiniuyunconfig = config.Value;
        }



        public string CreateToken()
        {
            string AK = _qiniuyunconfig.AK;
            string SK = _qiniuyunconfig.SK;
            // 目标空间名
            string bucket = _qiniuyunconfig.bucket;

            // 上传策略
            PutPolicy putPolicy = new PutPolicy
            {
                Scope = bucket,
                ReturnBody = "{\"url\":\"" + _qiniuyunconfig.url + "$(key)\",\"key\":\"$(key)\",\"hash\":\"$(etag)\"}",

            };
            // 上传策略的过期时间(单位:秒)
            putPolicy.SetExpires(_qiniuyunconfig.SetExpires);

            // 文件上传完毕后，在多少天后自动被删除
            //putPolicy.DeleteAfterDays = 1;

            // Use AK & SK here
            // 生成上传凭证
            Mac mac = new Mac(AK, SK);
            string jstr = putPolicy.ToJsonString();
            string token = Auth.CreateUploadToken(mac, jstr);
            return token;
        }



        public object UploadFile(Stream stream, string saveKey)
        {
            UploadManager um = new UploadManager();
            HttpResult result = um.UploadStream(stream, saveKey, this.CreateToken());
            return result;
        }

    }


}