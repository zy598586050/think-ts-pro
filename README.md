<p align="center">
  <img width="300px" src="https://www.think-js.cn/icon.png">
</p>

<p align="center">
  <a href="http://www.think-ts.cn">
    <img src="https://img.shields.io/badge/npm-v1.0.0-blue">
  </a>
  <a href="http://www.think-ts.cn">
    <img src="https://img.shields.io/badge/downloads-110k/month-green">
  </a>
  <a href="http://www.think-ts.cn">
    <img src="https://codecov.io/gh/element-plus/element-plus/branch/dev/graph/badge.svg?token=BKSBO2GLZI"/>
  </a>
  <br>
</p>

<p align="center">一个企业级的NodeJS应用框架</p>

- 💪 ORM思想用对象的方式CRUD
- 🔥 应用级提炼封装更贴近业务场景

## ThinkTS框架（案例版）

[ThinkTS](https://www.think-ts.cn) 是一个企业级的NodeJS应用框架，整合了各种常用SDK以及企业级常用的技术方案，为减少了开发人员的学习成本，提高团队的开发效率而生。

## 目录结构

```
.
├── app
│   ├── controller              // 控制器目录
│   │   └── hello.ts
│   ├── middleware              // 路由中间件目录
│   │   └── checkLogin.ts
│   ├── service                 // 模型目录
│   │   └── hello.ts
│   ├── validate                // 验证器目录
│   │   └── hello.ts
│   └── views                   // 视图目录
│       └── index.vue
├── cert                        // 证书文件目录
│   ├── ali_private_key.pem
│   ├── wx_private_key.pem
│   └── wx_public_key.pem
├── config                      // 配置文件目录
│   ├── alicloud.ts
│   ├── app.ts
│   ├── env.ts
│   ├── database.ts
│   ├── elasticsearch.ts
│   ├── mongodb.ts
│   ├── redis.ts
│   └── wx.ts
├── logs                       // 日志输出目录
│   ├── all-logs.log
│   └── log.2021-04-29.log
├── route                      // 路由配置目录
│   └── hello.ts
├── utils                      // 扩展工具函数目录
│   └── index.ts
├── websocket                  // websocket长连实现目录
│   └── ws.ts
├── public                     // 静态资源目录
│   ├── icon.ico
│   └── index.html
├── index.ts                   // 项目入口文件
├── package.json               // 项目配置文件
├── tsconfig.json              // TS配置文件
└── README.md                  // 项目说明文件
```

## 安装

通过脚手架安装

```
npm install think-ts-cli -g

think-ts-cli init demoApp
```

直接克隆

```
git clone https://github.com/zy598586050/think-ts.git
```

安装依赖

```
npm install
```

启动项目

```
// 开发环境
npm run dev

// 线上环境
npm run start
```

## 生态

* [ThinkVue3Admin](https://github.com/zy598586050/think-vue3-admin) 带权限配置的后台管理系统（技术方案集成）
* [ThinkTSProGo](https://github.com/zy598586050/think-js-pro-go) 带权限配置的后台管理系统GO后端服务（技术方案集成）
* [ThinkTSPro](https://gitee.com/zhangyubk/think-ts-pro) 移动端功能演示Demo（技术方案集成）
* [ThinkTSLIB](https://www.npmjs.com/package/think-ts-lib) 核心依赖
* [TinkTSCLI](https://www.npmjs.com/package/think-ts-cli) 脚手架
* ...

## 说明

此项目为案例版，带有众多技术方案的演示案例，如需查看无业务逻辑的基础框架，请移步 [这里](https://github.com/zy598586050/think-ts)

## 架构
<p align="center">
  <img src="https://think-js.cn/framework.png">
</p>

## 执照

ThinkTS已申请软件著作，可在中国版权保护中心中查看
[CPCC](https://www.ccopyright.com.cn).
