async function list (ctx) {
  ctx.body = 'assets list'
}
async function upload (ctx) {
  ctx.body = {
    code: '200',
    msg: 'assets upload'
  }
}
async function update (ctx) {
  ctx.body = 'assets update'
}
async function drop (ctx) {
  ctx.body = 'assets drop'
}

module.exports = {
  list,
  upload,
  update,
  drop
}
