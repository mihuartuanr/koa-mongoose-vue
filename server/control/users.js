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
function login(ctx) {
  console.log('------login=======');
  const { account, password } = ctx.request.body;

}
function list(ctx) {
  console.log('------list=======');
  ctx.body='list';
}
function get(ctx){
  console.log('------get=======');
  ctx.body='get';
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
