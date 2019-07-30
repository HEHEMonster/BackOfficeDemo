using System;
using System.Linq;
using ZDBACKOFFICE.Entity.Models;
using Microsoft.Extensions.Options;
using Neo4j.Driver.V1;

namespace ZDBACKOFFICE.Data.Neo4j
{
    public class Neo4jBase : INeo4jBase
    {
        private readonly IDriver _graphDatabase;
        private readonly Neo4jConfig _config;

        public Neo4jBase(IOptions<Neo4jConfig> config)
        {
            _config = config.Value;
            _graphDatabase = GraphDatabase.Driver($"bolt://{_config.Host}:{_config.Port}", AuthTokens.Basic(_config.UserName, _config.Password));
        }

        public IDriver GetDriver()
        {
            return _graphDatabase;
        }

        /// <summary>
        /// 同步用户新增vip 身份认证 名片认证属性
        /// </summary>
        /// <param name="nodeType">节点</param>
        /// <param name="id">用户id</param>
        /// <param name="vip">用户等级</param>
        /// <param name="ids">用户身份证认证状态</param>
        /// <param name="caree">用户名片认证状态</param>
        /// <returns></returns>
        public bool UpdateSingleNode(string nodeType, string id, string nickName, int vip, int identityAuth, int careerAuth, int careerType, DateTime registerAt, int status)
        {
            if (!ChackUserNode(nodeType, id))
            {
                return CreateSingleNode(nodeType, id, nickName, vip, identityAuth, careerAuth, careerType, registerAt, status);
            }
            string query = string.Format("match (n:{0}) where n.id = $queryid set n.id=$id,n.nickName=$nickName,n.vip=$vip,n.identityAuth=$identityAuth,n.careerAuth=$careerAuth,n.careerType=$careerType,n.registerAt=$registerAt,status:$status", nodeType);
            using (var session = _graphDatabase.Session(AccessMode.Write))
            {
                try
                {
                    var result = session.WriteTransaction(tx => tx.Run(query, new { queryid = id, id, nickName, vip, identityAuth, careerAuth, careerType, registerAt }));
                    IResultSummary rs = result.Summary;
                    return rs.Counters.PropertiesSet > 0;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        /// <summary>
        /// 创建node
        /// </summary>
        /// <param name="nodeType">node类型</param>
        /// <param name="id">id</param>
        /// <param name="vip">vip等级</param>
        /// <param name="ids">身份证</param>
        /// <param name="caree">名片</param>
        /// /// <param name="careerType">名片</param>
        /// <returns>bool 是否创建成功</returns>
        public bool CreateSingleNode(string nodeType, string id, string nickName, int vip, int identityAuth, int careerAuth, int careerType, DateTime registerAt, int status)
        {
            string query = string.Format("CREATE (n:{0} ", nodeType) + @"{id:$id,nickName:$nickName,vip:$vip,identityAuth:$identityAuth,careerAuth:$careerAuth,careerType:$careerType,registerAt:$registerAt,status:$status})";
            using (var session = _graphDatabase.Session(AccessMode.Write))
            {
                try
                {
                    var result = session.WriteTransaction(tx => tx.Run(query, new { id = id.ToLower(), nickName, vip, identityAuth, careerAuth, careerType, registerAt, status }));
                    IResultSummary rs = result.Summary;
                    return rs.Counters.NodesCreated == 1;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }
        /// <summary>
        /// 判断节点是否存在
        /// </summary>
        /// <param name="nodeType"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        public bool ChackUserNode(string nodeType, string id)
        {
            string query = string.Format("MATCH (n:{0}) where n.id='{1}'RETURN n", nodeType, id);
            using (var session = _graphDatabase.Session(AccessMode.Read))
            {
                try
                {
                    var result = session.ReadTransaction(tx => tx.Run(query));
                    return result.Count() > 0;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public bool CreateSingleNode(string nodeType, UserInfo userInfo)
        {
            string query = string.Format("CREATE (n:{0} ", nodeType) + @"{id: $userID,nickName:$NickName,vip:$Vip,identityAuth:$IdentityAuth,careerAuth:$CareerAuth,careerType:$CareerType,registerAt:$RegisterAt})";
            using (var session = _graphDatabase.Session(AccessMode.Write))
            {
                try
                {
                    var userID = userInfo.UserId.ToString();
                    var result = session.WriteTransaction(tx => tx.Run(query, new { userID, userInfo.NickName, userInfo.Vip, userInfo.IdentityAuth, userInfo.CareerAuth, userInfo.CareerType, userInfo.RegisterAt }));
                    IResultSummary rs = result.Summary;
                    return rs.Counters.NodesCreated == 1;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public bool UpdateSingleNode(string nodeType, UserInfo userInfo)
        {
            var userID = userInfo.UserId.ToString();
            if (!ChackUserNode(nodeType, userID))
            {
                return CreateSingleNode(nodeType, userInfo);
            }
            string query = $@"match(n:{nodeType}) where n.id= $queryId set n.id=$userID,n.nickName=$NickName, n.vip=$Vip,n.identityAuth=$IdentityAuth,n.careerAuth=$CareerAuth,n.careerType=$CareerType,n.registerAt=$RegisterAt";
            using (var session = _graphDatabase.Session(AccessMode.Write))
            {
                try
                {
                    var result = session.WriteTransaction(tx => tx.Run(query, new { queryId = userID, userID, userInfo.NickName, userInfo.Vip, userInfo.IdentityAuth, userInfo.CareerAuth, userInfo.CareerType, userInfo.RegisterAt }));
                    IResultSummary rs = result.Summary;
                    return rs.Counters.PropertiesSet > 0;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }
    }
}
