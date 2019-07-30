using System.Collections.Generic;

namespace ZDBACKOFFICE.Model
{
    public class RedisConfig
    {
        public List<RedisServer> Servers { get; set; }
    }

    public class RedisServer
    {
        public string Host { get; set; }
        public string Port { get; set; }
        public string Key { get; set; }
        public string Password { get; set; }
    }
}
