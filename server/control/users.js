const auth = require('../utils/auth');
const userModel = require('../model/user');

async function register(ctx) {
  const { account, password } = ctx.request.body;
  if(!account.trim() || !password.trim() ){
    ctx.body = {
      code: '403',
      data: null,
      msg: '参数不合法'
    };
    return;
  }
  const user = await userModel.findOne({
    account
  });
  if(user) {
    ctx.body = {
      code: '403',
      data: null,
      msg: '帐号已被注册'
    }
    return;
  }
  const newUser = await new userModel({
    account,
    password
  }).save();
  ctx.body = {
    code: '200',
    data: newUser,
    msg: '注册成功'
  }
}
async function login(ctx) {
  const { account, password } = ctx.request.body;
  if(!account || !password) {
    ctx.body = {
      code: '404',
      data: null,
      msg: '参数不合法'
    };
    return;
  }
  const user = await userModel.findOne({
    account,
    password
  });
  if(user) {
    const token = auth.sign({
      id: user.id,
      account
    })
    ctx.body = {
      code: '200',
      data: {
        token,
        id: user.id,
        account,
        alias: user.alias
      },
      msg: '登陆成功'
    }
    return;
  }
  ctx.body = {
    code: '404',
    data: null,
    msg: '帐号/密码错误'
  }
}
async function list(ctx) {
  const users = await userModel.find();
  console.log('------list=======');
  ctx.body = {
    code: '200',
    data: users,
    msg: 'list'
  };
}
async function get(ctx){
  const { id } = ctx.params;
  const user = await userModel.findOne({
    _id: id
  }).select('+avatar +alias +telephone +email +department +job +role');
  if(user) {
    ctx.body = {
      code: '200',
      data: user,
      msg: '成功'
    }
  } else {
    ctx.body = {
      code: '403',
      data: null,
      msg: '用户不存在'
    }
  }
}
function update(ctx){
  console.log('------update=======');
  ctx.body='update';
}
function drop(ctx){
  console.log('------drop=======');
  ctx.body='drop';
}

module.exports = {
  register,
  login,
  list,
  get,
  update,
  drop
}
