using System.Collections.Generic;
using MongoDB.Driver;
namespace ZDBACKOFFICE.Data.MongoDB
{
    public class MongoDataBaseContext
    {
        public IMongoClient _client = null;
        public IMongoDatabase _database = null;
        public MongoDataBaseContext(MongodbHost host)
        {
            MongoClientSettings mongoSettings = new MongoClientSettings();
            MongoCredential credentials = MongoCredential.CreateCredential(host.DataBase, host.UserName, host.PassWord);//添加用户名、密码
            mongoSettings.Credential = credentials;
            List<MongoServerAddress> hosts = new List<MongoServerAddress>();
            foreach (var a in host.Hosts)
            {
                hosts.Add(new MongoServerAddress(a.Address, a.Port));
            }
            mongoSettings.Servers = hosts;
            mongoSettings.ReadPreference = new ReadPreference(ReadPreferenceMode.Primary);
            _client = new MongoClient(mongoSettings);
            _database = _client.GetDatabase(host.DataBase);
        }
    }

    public class MongodbHost
    {
        /// <summary>
        /// Gets or sets the host.
        /// </summary>
        /// <value>The host.</value>
        public List<MongonServers> Hosts { get; set; }
        //public List<MongoDBServers> Hosts { get; set; }
        /// <summary>
        /// Gets or sets the name of the user.
        /// </summary>
        /// <value>The name of the user.</value>
        public string UserName { get; set; }
        /// <summary>
        /// Gets or sets the pass word.
        /// </summary>
        /// <value>The pass word.</value>
        public string PassWord { get; set; }
        /// <summary>
        /// Gets or sets the data base.
        /// </summary>
        /// <value>The data base.</value>
        public string DataBase { get; set; }
        /// <summary>
        /// Gets or sets the table.
        /// </summary>
        /// <value>The table.</value>
        //public string Table { get; set; }

    }

    public class MongonServers
    {
        public string Address { get; set; }
        public int Port { get; set; }
    }
}
