const fs = require('fs');
const path = require('path');
// const koaRequest = require('koa2-request');
const userModel = require('../model/user');
const { checkDirExist } = require('../utils/dir');

async function list (ctx) {
  ctx.body = 'assets list'
}
async function upload (ctx, next) {
  const file = Object.values(ctx.request.files)[0];
  const { category, id } = ctx.params;
  const token = ctx.headers.authorization;
  const remotePath = `${ctx.origin}/${category}/${id}/${file.name}`;
  const filePath = file.path;
  // 最终要保存到的文件夹路径
  const dir = path.join(__dirname,`../public/${category}/${id}/`);
  try {
    // 检查文件夹是否存在——>如果不存在，则新建文件夹
    checkDirExist(dir);

    const reader = fs.createReadStream(filePath);
    const writer = fs.createWriteStream(path.resolve(dir, file.name));
    reader.pipe(writer);

    // await koaRequest({
    //   url: `${ctx.origin}/users/${id}`,
    //   method: 'patch',
    //   headers: {
    //     Authorization: token
    //   },
    //   form: {
    //     avatar: remotePath
    //   }
    // });
    try {
      await userModel.updateOne(
        {
          _id: id
        },
        {
          avatar: remotePath
        }
      ).exec();
    } catch (err) {
      console.error(err)
      ctx.body = {
        code: '404',
        data: null,
        msg: '上传失败'
      };
      return;
    }
    // 删除文件
    fs.unlinkSync(filePath)
    ctx.body = {
      code: '200',
      data: {
        filePath: remotePath
      },
      msg: '上传成功'
    }
  } catch (err) {
    console.error(err)
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
