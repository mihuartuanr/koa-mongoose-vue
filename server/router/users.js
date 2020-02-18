const Router = require('@koa/router');
const controls = require('../control/users');
const routerUtils = require('../utils/router');

const {
  register,
  login,
  list,
  get,
  update,
  drop
} = controls;
const router = new Router({
  prefix: '/users'
});

const routes = [
  {
    path: '/',
    method: 'GET',
    handle: list
  },
  {
    path: '/',
    method: 'POST',
    handle: async (ctx) => {
      const { action } = ctx.query;
      switch (action) {
        case 'register':
          await register(ctx);
          break;
        case 'login':
          await login(ctx);
          break;
        default:
          await list(ctx);
      }
    }
  },
  {
    path: '/:id',
    method: 'GET',
    handle: get
  },
  {
    path: '/:id',
    method: 'PATCH',
    payload: {},
    handle: update
  },
  {
    path: '/:id',
    method: 'DELETE',
    handle: drop
  }
]

routerUtils.register.call(router, routes);

module.exports = router;

