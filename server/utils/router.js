function register(routes) {
  routes.forEach((route, idx) => {
    const { path, method, handle } = route;
    this[method.toLowerCase()](path, (ctx, next) => {
      handle(ctx);
    })
  })
}
module.exports = {
  register,
}
