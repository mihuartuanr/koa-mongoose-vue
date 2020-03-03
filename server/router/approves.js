const Router = require('@koa/router');
const approveModel = require('../model/approve');
const controls = require('../control/approves');
const routerUtils = require('../utils/router');

const {
  list,
  get,
  create,
  update,
  drop
} = controls;
const router = new Router({
  prefix: '/approves'
});

async function checkLoginer (ctx, next) {
  const { id } = ctx.params;
  const approve = await approveModel.findOne({
    _id: id
  });
  if (approve.creator != ctx.state.auth.id) {
    ctx.body = {
      code: '403',
      data: null,
      msg: '当前用户不是创建者'
    }
  } else {
    await next()
  }
}
const routes = [
  {
    path: '/',
    method: 'GET',
    handle: list
  },
  {
    path: '/',
    method: 'POST',
    handle: create
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
    handle: update,
    middlewares: [
      checkLoginer
    ]
  },
  {
    path: '/:id',
    method: 'DELETE',
    handle: drop,
    middlewares: [
      checkLoginer
    ]
  }
]

routerUtils.register.call(router, routes);

module.exports = router;

