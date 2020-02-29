function register(routes) {
  routes.forEach((route, idx) => {
    const { path, method, handle, middlewares = [] } = route;
    this[method.toLowerCase()](path, ...middlewares, async (ctx, next) => {
      await handle(ctx);
    })
  })
}
module.exports = {
  register,
}
