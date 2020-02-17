const Router = require('@koa/router');
const controls = require('../control/users');
const routerUtils = require('../utils/router');

const { register, list, get, update, drop } = controls;
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
    path: '/register',
    method: 'POST',
    payload: {},
    handle: register
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

