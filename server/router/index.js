const userRouter = require('./users');
const assetRouter = require('./assets');
const approveRouter = require('./approves');

module.exports = [
  userRouter.routes(),
  assetRouter.routes(),
  approveRouter.routes(),
  userRouter.allowedMethods(),
  assetRouter.allowedMethods(),
  approveRouter.allowedMethods()
];
