function register(ctx) {
  console.log('------register=======');
  ctx.body='register';
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
  list,
  get,
  update,
  drop
}
