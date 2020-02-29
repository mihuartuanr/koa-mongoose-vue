const Router = require('@koa/router');
const bodyParser = require('koa-body');
const controls = require('../control/assets');
const routerUtils = require('../utils/router');

const {
  upload,
  list,
  update,
  drop
} = controls;
const router = new Router({
  prefix: '/assets'
});

const routes = [
  {
    path: '/:category/:id',
    method: 'GET',
    handle: list
  },
  {
    path: '/:category/:id',
    method: 'POST',
    handle: upload
  },
  {
    path: '/:category/:id',
    method: 'PUT',
    payload: {},
    handle: update
  },
  {
    path: '/:category/:id',
    method: 'DELETE',
    handle: drop
  }
]

routerUtils.register.call(router, routes);

module.exports = router;

