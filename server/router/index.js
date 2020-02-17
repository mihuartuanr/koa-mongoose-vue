const userRouter = require('./users');

module.exports = {
  routes: [
    userRouter.routes(),
  ],
  allowedMethods: [
    userRouter.allowedMethods(),
  ]
};
