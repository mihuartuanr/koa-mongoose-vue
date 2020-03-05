const path = require('path');
const { checkDirExist } = require('../utils/dir');

// 日志根目录
const baseLogDir = path.resolve(__dirname, '../logs');
// 错误日志
const errorDir = 'error';
const errorFileName = 'error.log';
const errorDirPath = path.resolve(baseLogDir, errorDir);
const errorLogPath = path.resolve(errorDirPath, errorFileName);
// 访问日志
const accessDir = 'access';
const accessFileName = 'access.log';
const accessDirPath = path.resolve(baseLogDir, accessDir);
const accessLogPath = path.resolve(accessDirPath, accessFileName);

// 响应日志
const responseDir = 'response';
const responseFileName = 'response.log';
const responseDirPath = path.resolve(baseLogDir, responseDir);
const responseLogPath = path.resolve(responseDirPath, responseFileName);

[errorDirPath, accessDirPath, responseDirPath].forEach(p => {
  checkDirExist(p);
})
module.exports = {
  // 定义日志输出类型https://github.com/log4js-node/log4js-node/blob/master/docs/appenders.md
  appenders: {
    console: {
      type: 'stdout'
    },
    error: {
      type: 'dateFile', //https://github.com/log4js-node/log4js-node/blob/master/docs/dateFile.md
      filename: errorLogPath, // 定义生成文件的路径。
      daysToKeep: 7, // 保存7天日志，大于7天的，删除；
      pattern: '.yyyy-MM-dd',
      alwaysIncludePattern: true, // 只有该属性设置为true，才会以pattern追加重命名filename
      // keepFileExt: true //不起作用
    },
    access: {
      type: 'dateFile',
      filename: accessLogPath,
      daysToKeep: 7, // 保存7天日志，大于7天的，删除；
      pattern: '.yyyy-MM-dd',
      alwaysIncludePattern: true, // 只有该属性设置为true，才会以pattern追加重命名filename
      // keepFileExt: true //不起作用
    },
    response: {
      type: 'dateFile',
      filename: responseLogPath,
      daysToKeep: 7, // 保存7天日志，大于7天的，删除；
      pattern: '-yyyy-MM-dd',
      alwaysIncludePattern: true, // 只有该属性设置为true，才会以pattern追加重命名filename
      // keepFileExt: true //不起作用
    }
  },
  // 定义Logger对象类型，用于log4js.getLogger([category])
  categories: {
    default: {
      appenders: ['console'], level: 'all'
    },
    errorLogger: {
      appenders: ['error'], level: 'error'
    },
    accessLogger: {
      appenders: ['access'], level: 'info'
    },
    responseLogger: {
      appenders: ['response'], level: 'info'
    }
  }
};
