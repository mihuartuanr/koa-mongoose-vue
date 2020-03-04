# 数据库关联

## 任务

* TODO：数据库表关联
  * `ref`
  * `Schema.Types.ObjectId`
* TODO：存储数据
  * 审批路由
  * 增删改查处理逻辑
* TODO：查询引用数据
  * `populate().exec()`

## 数据表一对多关系

* `Schema`用`ref`关联另一个表的数据，在存储`ref`对应的值时，需要**手动**地往关联对象中插入数据。 ——> 可能会出现同步出错。

## 自定义中间件

* `next()`必须手动调用，否则，不会走后续的中间件
* 第三方的中间件，不必管`next`，内部在某时机调用了

## `el-table`

* `el-table-column`所有列的`width`和小于`el-table`时，`el-table`展示异常 ——> 至少有一个额`el-table-column`的`width`设置为`auto`
