# 单点登陆

## Jwt方案

* 使用`jsonwebtoken`编码、解码`token`；
* 使用`koa-jwt`从`ctx.header.authorization`中提取`token`，自动解码数据，保存到`ctx.state`中；
  * `jwt`有三个任务：签名（加密数据sign）、认证(vertify)、解码（获取数据decode）;
