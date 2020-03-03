const log4js = require('koa-log4');
const config = require('../config/log');

//以规范对象开启日志功能
log4js.configure(config);

// 获取日志对象实例
const errorLogger = log4js.getLogger('errorLogger');
const accessLogger = log4js.getLogger('accessLogger');
const responseLogger = log4js.getLogger('responseLogger');
const consoleLogger = log4js.getLogger();

const logUtil = {};
// 封装错误日志
logUtil.logError = function (ctx, error, resTime) {
  if (ctx && error) {
    errorLogger.error(formatError(ctx, error, resTime));
  }
};

// 封装请求日志
logUtil.logAccess = function (ctx, resTime) {
  if (ctx) {
    accessLogger.info(formatAccessLog(ctx, resTime));
  }
};
// 封装响应日志
logUtil.logResponse = function (ctx, resTime) {
  if (ctx) {
    responseLogger.info(formatRes(ctx, resTime));
  }
};

logUtil.logInfo = function (info) {
  if (info) {
    consoleLogger.info(formatInfo(info));
  }
};

const formatInfo = function (info) {
  let logText = '';
  // 响应日志开始
  logText += '\n' + '*************** console log start ***************' + '\n';

  // 响应内容
  logText += 'console detail: ' + '\n' + JSON.stringify(info) + '\n';

  // 响应日志结束
  logText += '*************** console log end ***************' + '\n';

  return logText;
};

// 格式化响应日志
const formatRes = function (ctx, resTime) {
  let logText = '';
  // 响应日志开始
  logText += '\n' + '*************** response log start ***************' + '\n';

  // 添加请求日志
  logText += formatAccessLog(ctx, resTime);

  // 响应状态码
  logText += '\n' + 'response status: ' + ctx.status + '\n';

  // 响应内容
  logText += 'response body: ' + '\n' + JSON.stringify(ctx.body) + '\n';

  // 响应日志结束
  logText += '*************** response log end ***************' + '\n';

  return logText;
};

// 格式化错误日志
const formatError = function (ctx, err, resTime) {
  let logText = '';

  // 错误信息开始
  logText += '\n' + '*************** error log start ***************' + '\n';

  // 添加请求日志
  logText += formatAccessLog(ctx, resTime);

  // 错误名称
  logText += '\n' + 'err name: ' + err.name + '\n';
  // 错误信息
  logText += 'err message: ' + err.message + '\n';
  // 错误详情
  logText += 'err stack: ' + err.stack + '\n';

  // 错误信息结束
  logText += '*************** error log end ***************' + '\n';

  return logText;
};

// 格式化请求日志
const formatAccessLog = function (ctx, resTime) {
  const { method, originalUrl, ip, query, params, body } = ctx.request;
  let logText = '';
  // 客户端ip
  logText += 'request client ip: ' + ip + '\n';
  // 客户端
  logText += 'request userAgent: ' + ctx.header['user-agent'] + '\n';
  // 访问协议
  logText += 'request protocol: ' + ctx.protocol + '\n';
  // 访问方法
  logText += 'request method: ' + method + '\n';
  // 请求原始地址
  logText += 'request originalUrl:  ' + originalUrl + '\n';
  // 请求参数
  logText += params ? 'request params:  ' + JSON.stringify(params) + '\n' : '';
  logText += query ? 'request query:  ' + JSON.stringify(query) + '\n' : '';
  logText += body ? 'request body:  ' + JSON.stringify(body) + '\n' : '';
  // 服务器响应时间
  logText += 'response time: ' + resTime + '\n';

  return logText;
};

module.exports = logUtil;
