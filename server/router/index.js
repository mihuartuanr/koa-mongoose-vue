const userRouter = require('./users');
const assetRouter = require('./assets');

module.exports = [
  userRouter.routes(),
  assetRouter.routes(),
  userRouter.allowedMethods(),
  assetRouter.allowedMethods()
];
