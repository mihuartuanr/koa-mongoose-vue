## 任务

* TODO：更新人员信息（非头像）
* TODO： 文件路由配置
* TODO：文件上传
  * 前端上传
  * 后台接收
* TODO：前端访问文件资源
  * 静态化资源
  * 动态资源
* TODO：保存文件
  * 保存到指定用户路径下
* TODO：更新用户头像
  * 直接更新`userModel`
  * 后端以`patch`方法调用`/user/:id`接口--**有操作日志**

## 多路由配置

* `koa`实例使用中间件，**不支持**`app.use(middleware1, middleware2)`这种**多参数**形式，**只支持**`app.use(middleware1).use(middleware2)`**单参数链式**调用。

## `koa-body`配置支持文件上传

* `koa-body`默认不支持文件上传
* `koa-body`添加以下配置支持文件上传
```
const bodyParser = require('koa-body')

app.use(bodyParser({
  multipart: true, //支持文件上传--将文件数据以健值对的形式，存储到ctx.request.files中
  formidable: {
    uploadDir: '', //必须指定一个文件上传存储路径
    keepExtensions: true, //上传文件存储默认是没有扩展文件名的
  }
}))
```
* `koa-body`配置`onFileBegin`改名
```
app.use(bodyParser({
  ...
  formidable: {
    ...
    onFileBegin(key, file) {
      // 通过重写file.path可以修改存储路径/改名；
      // 只能获取file相关的数据，获取ctx数据
      file.path = ''
    }
  }
}))
```
* `postman`测试文件上传
  * Method： POST
  * Body --> form-data --> key：Text/File --> 选择File（表单上传是以这种形式）
  * 或 Body --> binary （目前不知道哪种场景用）

## 前端访问文件资源

* 目前，前端访问后台，都是访问的后台的动态服务；若直接通过`localhost:3000/avatars/userid/filename.png`(假设地址)访问图片资源，会返回`404`错误码。这是因为后台将匹配该路径，查找对应的动态服务。
* 通过以下配置：
```
const path = require('path')
const koaStatic = require('koa-static')

app.use(koaStatic(path.resolve(__dirname, 'public'))) // 将`public`目录设置为静态资源，位置要置于路由之前。
app.use(koaJwt({
  ...
}).unless({
  ...
  path: ['/public']
})) // 禁用鉴权服务
```
* 前端访问资源路径：`localhost:3000/avatars/userid/filename.png`，注意，**不要添加`/public`**，否则，匹配不到，报`404`错误码

## 保存文件

* 在上传服务的处理逻辑中编写文件保存逻辑，通过测试可以看到指定文件夹下有对应的文件
```
const path = require('path');
const fs = require('fs');

function checkDirExist(dirname) {
  if (fs.existsSync(dirname)) {
    return true;
  } else {
    if (checkDirExist(path.dirname(dirname))) {
      fs.mkdirSync(dirname);
      return true;
    }
  }
}

async upload(ctx) {
  const file = Object.values(ctx.request.files)[0] // 单文件上传
  const { category, id } = ctx.params
  const originPath = file.path
  const destDir = path.resolve(__dirname, '..', 'public', category, id)
  const destPath = path.resolve(destDir, file.name)
  const remotePath = `${ctx.origin}/${category}/${id}/${file.name}`

  checkDirExists(destDir)
  const r = createReadSteam(originPath) // 路径必须落实到文件名
  const w = createWriteSteam(destPath) // 路径必须落实到文件名
  r.pipe(w)
  fs.unlinkSync(originPath)
  ctx.body = {
    code: '200',
    data: {
      filePath: remotePath
    },
    msg: '上传成功'
  }
}
```

## 更新用户头像

* 上传图片的目的是更新当前登陆用户的头像
  * 直接操作userModel更新用户信息
  * 在接口处理逻辑中通过`koa2-request`以`patch`方法调用`/users/:id`自身接口
    * 优点：有操作日志
    * 缺陷：这种请求要**注意中间件的调用顺序（洋葱模型）**，发生错误，**不易调试**。
```
const koaRequest = require('koa2-request')

async upload(ctx) {
  const token = ctx.headers.authorization
  ...
  const res = koaRequest({
    url: ctx.origin + '/users/' + id,
    form: {
      avatar: remotePath
    }, // payload
    method: 'patch',
    headers: {
      token
    }
  })
}
```
或
```
async upload(ctx) {
  ...
  await userModel.updateOne(
    {
      _id: id
    },
    {
      avatar: remotePath
    }
  ).exec();
}
```
