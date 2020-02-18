## 背景

学习《仿知乎，Restful Api》的课后练习。

## 起步

### 构建Server

* 使用`koa`搭建服务端；
```
const koa = require('koa');

const app = new koa();
app.listen(3000, 'localhost', () => {
  // host & port 推荐定义在配置文件中；
  console.log('server in running at http://localhost:3000/');
})
```

### 连接mongodb

* 使用`mongoose`连接`mongodb`;
```
const mongoose = require('mongoose');
// host & port & database 推荐定义在配置文件中；
mongoose.connect('mongodb://localhost:27017/jingData');
// mongoose.connect连接mongodb，返回一个异步对象，可监听事件；
const db = mongoose.connection;
db.on('connected', () => {
  console.log('mongoose已经成功连接mongodb://localhost:27017/jingData');
})
db.on('error', err => {
  console.log('mongoose连接发生错误：' + err);
})
db.on('disconnected', () => {
  console.log('mongoose与mongodb://localhost:27017/jingData断开连接');
})
```

### 定义Model

```
// Schema定义数据结构规范；
const Schema = mongoose.Schema;
const userSchema = new Schema({
  account: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false
  }
});
// 根据数据结构规范，定义数据模型；
mongoose.model('User', userSchema);
```

### 定义路由

* 使用@koa/router定义路由；
```
// 定义路由配置
const routes = [
  {
    url: '/login',
    method: 'post',
    handle: login
  },
  {
    url: '/logout',
    method: 'get',
    handle: logout
  }
];

// 注册路由；
const Router = require('@koa/router');
const userRouter = new Router({
  prefix: '/users'
});
routes.forEach(route => {
  const { url, method, handle } = route;
  userRouter[method](url, (ctx, next) => {
    handle.call(ctx);
    next();
  })
});
module.exports = userRouter;

// ./router/index.js统一路由接口；
const userRouter = require('./users');
module.exports = {
  routes: [
    // userRouter.routes()返回一个中间件
    userRouter.routes(),
  ],
  allowedMethods: [
    // userRouter.allowedMethods()返回一个中间件
    userRouter.allowedMethods(),
  ]
}

// ./bin/index.js中注册路由中间件;
const router = require('./router/index');

app.use(...router.routes).use(...router.allowedMethods);
```

### 定义Controls

* 路由处理函数；

## 后续

* 注册接口
* 登陆接口
```
koa-body必须在，用到ctx.request.body的中间件的前边注册。
```


* Jwt认证
* 登陆跳转
