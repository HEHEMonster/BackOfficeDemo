# ZDBACKOFFICE <赚道后台系统>

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

### 代码分支
  + **master**  `预演分支`
  + **product** `生产分支`
  + **test**    `开发分支`

### 线上地址
+ [测试环境](http://106.75.245.241:8084)
    - **账号**: `admin`
    - **密码**: `123456`
+ [预演环境](https://demoadmin.9wins.cn)
    - **账号**: `jiuying` 
    - **密码**: `aCzeh6qHxOXdX0PX`
+ [生产环境](https://proadmin.9wins.cn/)
    - **账号**: `admin` 
    - **密码**: `07d7f218ea9f44ad9605572d99d3079e`
+ [RUNDECK上线发布](http://106.75.245.241:4445)
    - **账号**: `dotnet` 
    - **密码**: `FXUvjczPFqHuU25f`
+ CMDB位置(sftp)
    - **地址**: `106.75.245.241:60022`
    - **账号**: `config` 
    - **密码**: `RxQV4dBt1w8O7vsO`
+ 日志服务器(sftp)
    - **地址**: `106.75.245.241:60022`
    - **账号**: `logs` 
    - **密码**: `XgNZ1JNcvhNRMNuE`
    - **服务器路径**: `/mnt/logs/ZDBACKOFFICE/`

### SVN项目文档
+ **地址**: https://139.196.48.31/svn/jyzd
+ **账号**: `dev`
+ **密码**: `dev123`
+ **文档路径**: `02产品/原型设计/后台管理`
