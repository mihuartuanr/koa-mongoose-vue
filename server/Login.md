# 单点登陆

## Jwt方案

* 使用`jsonwebtoken`签名（加密数据sign）、认证(vertify)、解码`token`（获取数据decode），参数`payload`、`secret`；
* 使用`koa-jwt`，提供参数`secret`、`key`、`isRevoked`
  * 从`ctx.header.authorization`中提取`token`，自动解码数据，保存到`ctx.state[key]`中；
  * 每次请求走该中间件，根据配置，自动调用`jsonwebtoken`的`vertify`方法校验`token`是否已被废除；
```
const jwt = require('jsonwebtoken');
const secret = 'secret';

module.export = {
  sign: payload => {
    const token = jwt.sign(payload, secret, {
      expiresIn: '2h',
    });
    return token;
  },
  vertify: (ctx, decodedToken, token) => {
    let result = true;
    try{
      jwt.vertify(token, secret);
      result = false;
    }catch(err){

    }
    return result;
  }
}
// ======================
const koaJwt = require('koa-jwt');
const { vertify } = require('./auth');
const secret = 'secret';
  // ==========异常处理============
app.use((ctx, next) => {
  return next().catch(err){
    if(401 === err.status) {
      ctx.status = 401;
      ctx.body = '登陆失效，请重新登陆！'
    }else {
      throw err;
    }
  }
})
  // ==========koaJwt配置============
app.use(
  koaJwt({
    secret,
    key: 'jingData',
    isRevoked: vertify
  }).unless({
    custom: ctx => {
      // 定义认证白名单
      // return true ===> 不会进行token认证；
      // return false ===> 进行token认证；
    }
  })
)
```

## 前端登陆

* 调用后端登陆服务，使用`localStorage`存储返回的`token`;
* 在`axios.interceptors.request.use`请求拦截器中，设置`config.headers.Authorization = 'Bearer ${token}'`，`Bearer `必须使用该前缀;
* 异常处理
  * 若认证失败，跳转到路由
```
const router = require('./router');

axios.interceptors.response.use(res => {
  if(res.status.startWith('4')) {
    // 在Vue环境中，使用this.$router.push()跳转路径；
    // 非Vue环境中，需要引入New Router()实例，进行跳转；
    router.push('/');
  }
})
```
