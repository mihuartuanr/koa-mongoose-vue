function register(routes) {
  routes.forEach((route, idx) => {
    const { path, method, handle } = route;
    this[method.toLowerCase()](path, async (ctx, next) => {
      await handle(ctx);
    })
  })
}
module.exports = {
  register,
}
