const koa = require('koa');
const bodyParser = require('koa-body');
var cors = require('koa2-cors');
const router = require('./router/index');

const app = new koa();

app.use(cors());
//中间件：payload解析
app.use(bodyParser());
//中间件： 路由
app.use(...router.routes).use(...router.allowedMethods);

app.on('error', (err, ctx) => {
  log.error('server error', err, ctx)
});
module.exports = app;
