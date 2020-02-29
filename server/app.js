const koa = require('koa');
const path = require('path');
const bodyParser = require('koa-body');
const koaStatic = require('koa-static');
const cors = require('koa2-cors');
const koaJwt = require('koa-jwt');
const routes = require('./router/index');
const { secret, authKey } = require('./config/auth');
const { vertify } = require('./utils/auth');

const app = new koa();

// 中间件：指定静态资源路径 vs. 使其与动态资源分离
app.use(koaStatic(path.join(__dirname, 'public/')))
app.use(cors());

//中间件：鉴权
app.use(function(ctx, next){
  return next().catch((err) => {
    if(err.message == 'jwt expired'){
      //通过jsonwebtoken返回的err.message判断token认证失败的类型
      ctx.body = 'jwt超时'
      return
    }
    if (401 == err.status) {
      ctx.status = 401;
      ctx.body = `${err.message}\n请先登陆`;
    } else {
      throw err;
    }
  });
});
app.use(koaJwt({
  secret,
  key: authKey,
  // jwt是否被废除
  isRevoked: vertify
}).unless({
  custom: function(ctx) {
    const { method, path, query } = ctx;
    if(path === '/'){
      return true;
    }
    if(/^\/public/.test(path)) {
      return true;
    }
    if(path === '/users' && query.action) {
      return true;
    }
    return false;
  }
}));
//中间件：payload解析
app.use(bodyParser({
  multipart: true,
  formidable: {
    uploadDir: path.resolve(__dirname, './public/temp'),
    keepExtensions: true
  }
}));
//中间件： 路由 --> 不支持一次性注册多个中间件
// app.use(...router.routes).use(...router.allowedMethods);
routes.forEach(route => {
  app.use(route);
});


app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});
module.exports = app;
