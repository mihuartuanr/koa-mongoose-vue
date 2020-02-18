## 请求服务器，返回HTTP Code 404

* 返回数据格式不是指定contentType（如`application/json`）;
* **注意**： `async`定义的函数，一定要用`await`前缀调用，否则，`ctx.body`获取不到，导致404错误。
