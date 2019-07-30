using ZDBACKOFFICE.Core;
using ZDBACKOFFICE.Entity.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.Serialization;
using System.Runtime.Serialization.Formatters.Binary;
using System.Linq.Expressions;

namespace ZDBACKOFFICE.Data
{
    public class InMemoryRepository<T> : IInMemoryRepository<T> where T : class
    {
        private readonly ZDDBContext _dbContext;
        private readonly IDistributedCache _distributedCache;
        private string key;
        private bool enable = false;
        public InMemoryRepository(ZDDBContext dbContext, IDistributedCache distributedCache)
        {
            _dbContext = dbContext;
            _distributedCache = distributedCache;
            otherOperation += new otherOperation(() => { });
        }
        public void Attach(T entity)
        {
            throw new NotImplementedException();
        }


        public virtual ZDDBContext DBContext()
        {
            return _dbContext;
        }

        public virtual DbSet<T> DbSet()
        {
            return _dbContext.Set<T>();
        }





        public virtual T GetById(string id)
        {
            if (enable)
            {
                key = this.ToString() + id;
                if (_distributedCache.Get(key) == null)
                {
                    _distributedCache.Set(key, Object2Bytes(_dbContext.Set<T>().Find(id)), new DistributedCacheEntryOptions());
                }
                return (T)Bytes2Object(_distributedCache.Get(key));
            }
            else
            {
                return _dbContext.Set<T>().Find(id);

            }
        }
        public T GetById(int id)
        {
            if (enable)
            {
                key = this.ToString() + id;
                if (_distributedCache.Get(key) == null)
                {
                    _distributedCache.Set(key, Object2Bytes(_dbContext.Set<T>().Find(id)), new DistributedCacheEntryOptions());
                }
                return (T)Bytes2Object(_distributedCache.Get(key));
            }
            else
            {
                return _dbContext.Set<T>().Find(id);

            }
        }
        public virtual IList<T> List()
        {
            if (enable)
            {


                key = this.ToString();
                if (_distributedCache.Get(key) == null)
                {
                    _distributedCache.Set(key, Object2Bytes(_dbContext.Set<T>().ToList()), new DistributedCacheEntryOptions());
                }
                return (IList<T>)Bytes2Object(_distributedCache.Get(key));
            }
            else
            {
                return _dbContext.Set<T>().ToList();

            }
        }
        public virtual IList<T> List(System.Linq.Expressions.Expression<Func<T, bool>> predicate)
        {
            if (enable)
            {
                key = key + predicate.ToString();
                if (_distributedCache.Get(key) == null)
                {
                    _distributedCache.Set(key, Object2Bytes(_dbContext.Set<T>()
                       .Where(predicate)
                       .ToList()), new DistributedCacheEntryOptions());
                }
            }
            else
            {
                return _dbContext.Set<T>().Where(predicate).ToList();

            }
            return (IList<T>)Bytes2Object(_distributedCache.Get(key));

        }
        public int Insert(T entity)
        {
            //_distributedCache.Remove(key);
            _dbContext.Set<T>().Add(entity);
            int i = _dbContext.SaveChanges();
            _distributedCache.Remove(this.ToString());
            return i;
        }

        public int InsertWithOutTransaction(T entity)
        {
            //_distributedCache.Remove(key);
            _dbContext.Set<T>().Add(entity);
            int i = _dbContext.SaveChanges();
            _distributedCache.Remove(this.ToString());
            return i;
        }
        public int Update(T entity)
        {
            int i = -1;
            //startup 文件 增加 UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking)
            //可以去除跟踪Tracking 使得下面的更新可以 不跟踪 后更新
            using (var transaction = DBContext().Database.BeginTransaction())
            {
                try
                {
                    //主操作
                    _dbContext.Entry(entity).State = EntityState.Modified;
                    i = _dbContext.SaveChanges();
                    otherOperation.Invoke();//这句在上面SaveChanges下面 可以保护返回i值不被 otherOperation 里的SaveChanges 修改
                    transaction.Commit();
                    //清除缓存
                    _distributedCache.Remove(this.ToString());
                }
                catch (Exception ex)
                {
                    Console.Write(ex.ToString());
                    return i;
                }
            }
            return i;
        }

        public int UpdateWithOutTransaction(T entity)
        {
            int i = -1;
            //startup 文件 增加 UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking)
            //可以去除跟踪Tracking 使得下面的更新可以 不跟踪 后更新
            try
            {
                //主操作
                _dbContext.Entry(entity).State = EntityState.Modified;
                i = _dbContext.SaveChanges();
                //清除缓存
                _distributedCache.Remove(this.ToString());
            }
            catch (Exception ex)
            {
                Console.Write(ex.ToString());
                return i;
            }

            return i;
        }

        public int Delete(T entity)
        {
            key = this.ToString();
            _dbContext.Set<T>().Remove(entity);
            int i = _dbContext.SaveChanges();
            _distributedCache.Remove(this.ToString());
            return i;
        }

        public event otherOperation otherOperation;



        /// <summary>
        /// 将对象转换为byte数组
        /// </summary>
        /// <param name="obj">被转换对象</param>
        /// <returns>转换后byte数组</returns>
        public static byte[] Object2Bytes(object obj)
        {
            byte[] buff;
            using (MemoryStream ms = new MemoryStream())
            {
                IFormatter iFormatter = new BinaryFormatter();
                iFormatter.Serialize(ms, obj);
                buff = ms.GetBuffer();
            }
            return buff;
        }
        /// <summary>
        /// 将byte数组转换成对象
        /// </summary>
        /// <param name="buff">被转换byte数组</param>
        /// <returns>转换完成后的对象</returns>
        public static object Bytes2Object(byte[] buff)
        {
            object obj;
            using (MemoryStream ms = new MemoryStream(buff))
            {
                IFormatter iFormatter = new BinaryFormatter();
                obj = iFormatter.Deserialize(ms);
            }
            return obj;
        }

        public IList<T> FindList<T>(params Expression<Func<T, bool>>[] where) where T : class
        {
            if (where != null && where.Length > 0)
            {
                var query = _dbContext.Set<T>().Where(where[0]);
                for (int i = 1; i < where.Length; i++)
                {
                    query = query.Where(where[i]);
                }
                return query.ToList ();
            }
            return null;
        }
    }

}



