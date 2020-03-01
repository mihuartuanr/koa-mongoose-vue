const fs = require('fs');
const path = require('path');
const { checkDirExist } = require('../utils/dir');

async function list (ctx) {
  ctx.body = 'assets list'
}
async function upload (ctx) {
  const file = Object.values(ctx.request.files)[0];
  const { category, id } = ctx.params;
  const filePath = file.path;
  // 最终要保存到的文件夹路径
  const dir = path.join(__dirname,`../public/${category}/${id}/`);
  try {
    // 检查文件夹是否存在——>如果不存在，则新建文件夹
    checkDirExist(dir);

    const reader = fs.createReadStream(filePath);
    const writer = fs.createWriteStream(path.resolve(dir, file.name));
    reader.pipe(writer);
    ctx.body = {
      code: '200',
      data: {
        filePath: `${ctx.origin}/${category}/${id}/${file.name}`
      },
      msg: '上传成功'
    }
  } catch (err) {
    ctx.body = {
      code: '404',
      data: null,
      msg: '上传失败'
    }
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
