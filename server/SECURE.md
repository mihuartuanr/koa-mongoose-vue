# 安全策略

* `koa-helmet` 官方展示很简单，可是，没成功应用
* `xss`

## 目前存在问题

* 前端校验了参数，后台没有校验
  * 若用Postman/其它方式调用接口，数据不规范
* 登出时未清除数据
  * 清除`localStorage`
  * 清除`vuex`：Object.assign(state, InitState)

