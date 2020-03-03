# 日志系统

## 技术选型
* koa-logger
  * 只能设置统一的日志
* koa-morgan
  * 能根据`skip`分类，但，不自由
* koa-log4js
  * 可以定制化
  * 周期性存储

## koa-log4js规范对象

* 参考文档 https://github.com/log4js-node/log4js-node/blob/master/docs/api.md
* log4默认是禁用的，不会打印日志：`log4js.configure()`
* log4通过配置项开启日志功能：`log4js.configure({...})`
```
// configure规范对象
{

  // 自定义日志等级/修改内部已定义的日志等级
  // 日志等级：OFF > MARK > FATAL > ERROR > WARN > INFO > DEBUG > TRACE > ALL
  levels: {
    ...
  },
  {
    // 定义日志输出类型 (参考文档：https://github.com/log4js-node/log4js-node/blob/master/docs/appenders.md)
    appenders: {
      error: {
        // type是必选属性，其它属性配置依赖于type属性值
        type: 'dateFile', // （dateFile参考文档：https://github.com/log4js-node/log4js-node/blob/master/docs/dateFile.md）
        filename: path.resolve(__dirname, 'logs', 'error', 'filename'), // 定义日志存储位置，与最终指向的目录/文件同级：filename推荐不要加后缀名
        pattern: '.yyyy-MM-dd.log', // 日志周期，这里加上文件后缀
        alwaysIncludePattern: true, // alwaysIncludePattern为true时，才会实现以pattern规则（如：yyyy-MM-dd）新建文件一天一存
        //keepFileExt: true // 没有像官网说的那样生效，所以，通过设置pattern值带后缀文件名来替代
      }
    },
    // 预自定义日志类型：log4js.getLoggeer([category])获取该类型的日志实例
    categories: {
      // 必须定义一个默认类型，当没有匹配的类型时，一律按默认类型处理
      default: {

      },
      errorLog: {
        appenders: ['error'], // 指定日志输出类型
        // 指定可用的最小日志等级
        level: 'error', //可以使用OFF > MARK > FATAL > ERROR等级，不可以使用WARN > INFO > DEBUG > TRACE > ALL等级
        enableCallStack: true // 是否打印所属文件名 & 行号
      }
    }
  }
}
```

## log4js格式化输出
