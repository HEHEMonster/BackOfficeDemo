# ZDBACKOFFICE

使用 [.Net Core](https://docs.microsoft.com/zh-cn/aspnet/core/tutorials/razor-pages/?view=aspnetcore-2.2) v2.1 与 [React](https://react.docschina.org/) 组件库[Ant Design of React](https://ant-design.gitee.io/docs/react/introduce-cn) 开发的SPA后台管理系统,权限验证使用JWT身份认证(基于角色授权)

### 项目结构
```
ZDBACKOFFICE
├── CSRedisCore         => Redis操作基类
├── ZDAIRecognizer      => 调用AI接口帮助类
├── ZDBACKOFFICE        => 后台项目Web和API
│   ├── ...
│   ├── Api             => 后端接口
│   ├── ClientApp       => React前端项目 由CRA创建
│   ├── ...
├── ZDBACKOFFICE.Common => 项目通用类
├── ZDBACKOFFICE.Core   => 项目仓储接口,Mapping,自定义数据映射实体
├── ZDBACKOFFICE.Data   => 项目数据层 仓储的实现类,MongoDB,Neo4J接口 
├── ZDBACKOFFICE.Entity => EF实体层
├── ZDRedisCore         => 赚道Redis数据库API接口
    .gitignore
    READNE.md
    ZDBACKOFFICE.sln
```
### 项目启动方式
```sh
    cd ZDBACKOFFICE
    dotnet watch run

    cd ZDBACKOFFICE/ClientApp
    npm install
    npm start
```
##### 或 **Startup.cs** 修改如下代码直接运行
```C#
    spa.UseReactDevelopmentServer(npmScript: "start");
```


