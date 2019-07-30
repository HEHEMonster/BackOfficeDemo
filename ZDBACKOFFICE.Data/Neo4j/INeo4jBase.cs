using Neo4j.Driver.V1;

namespace ZDBACKOFFICE.Data.Neo4j
{
    using System;
    using ZDBACKOFFICE.Entity.Models;
    public interface INeo4jBase
    {
        IDriver GetDriver();
        bool UpdateSingleNode(string nodeType, string id, string nickName, int vip, int identityAuth, int careerAuth, int careerType, DateTime registerAt, int status);
        bool CreateSingleNode(string nodeType, string id, string nickName, int vip, int identityAuth, int careerAuth, int careerType, DateTime registerAt, int status);
        bool ChackUserNode(string nodeType, string id);

        bool CreateSingleNode(string nodeType, UserInfo userInfo);
        bool UpdateSingleNode(string nodeType, UserInfo userInfo);
    }
}
