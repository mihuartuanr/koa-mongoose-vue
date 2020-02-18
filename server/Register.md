## 注册业务

* 使用`koa-body`解析`payload`；
* 使用`userModel.findOne({account})`查找匹配的数据；
* 使用`new userModel({}).save()`存储数据；
```
// 在router中间件前方，注册koa-body；
app.use(bodyParser());

const {account, password} = ctx.request.body;

const user = await userModel.findOne({
  account
});
if(user) {
  ctx.body = {
    code: '403',
    msg: '帐号已经被注册'
  }
  return;
}
const newUser = await new userModel({
  account,
  password
}).save();
ctx.body = {
  code: '200',
  data: newUser,
  msg: '帐号注册成功'
}
```
