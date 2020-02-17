const koa = require('koa');
const router = require('./router/index');

const app = new koa();

app.on('error', (err, ctx) => {
  log.error('server error', err, ctx)
});

//中间件： 路由
app.use(...router.routes).use(...router.allowedMethods);

module.exports = app;
