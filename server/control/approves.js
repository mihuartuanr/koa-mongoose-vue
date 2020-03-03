const moment = require('moment');
const approveModel = require('../model/approve');
const userModel = require('../model/user');

async function list(ctx) {
  // 【官方不优先推荐】
  // try {
  //   const loginer = await userModel.findOne({
  //     _id: ctx.state.auth.id
  //   }).populate({
  //     path: 'approves'
  //   }).exec();
  //   ctx.body = {
  //     code: '200',
  //     data: loginer.approves,
  //     msg: '查询成功'
  //   };
  // } catch (err) {
  //   ctx.body = {
  //     code: '403',
  //     data: {
  //       error: err
  //     },
  //     msg: '查询失败'
  //   }
  // }
  // 【通常做法，由多的一方过滤单一的一方】
  // 文档：http://www.mongoosejs.net/docs/populate.html#refs-to-children
  try {
    const approves = await approveModel.find({
      creator: ctx.state.auth.id
    });
    ctx.body = {
      code: '200',
      data: approves,
      msg: '查询成功'
    };
  } catch (err) {
    ctx.body = {
      code: '403',
      data: {
        error: err
      },
      msg: '查询失败'
    }
  }
}
async function get(ctx){
  const { id } = ctx.params;
  try {
    const approve = await approveModel.findOne({
      _id: id
    }).populate({
      path: 'creator',
      select: '+avatar +alias +telephone +email +department +job +role +_id +__v'
    }).exec();
    if(creator) {
      ctx.body = {
        code: '200',
        data: approve,
        msg: '成功'
      }
    } else {
      ctx.body = {
        code: '403',
        data: null,
        msg: '找不到数据创建人'
      }
    }
  } catch (err) {
    ctx.body = {
      code: '404',
      data: {
        _id: id
      },
      msg: '获取失败，请核对数据id'
    }
  }
}
async function create(ctx) {
  const { id: loginerId } = ctx.state.auth;
  const payload = ctx.request.body;
  const curtime = moment().format('x');
  try {
    const newApprove = await new approveModel({
      ...payload,
      status: false,
      creator: loginerId,
      modifier: loginerId,
      createtime: curtime,
      latesttime: curtime,
    }).save();
    // 【官方不优先推荐】
    // const loginer = await userModel.findOne({
    //   _id: loginerId
    // });
    // loginer.approves.push(newApprove._id)
    // loginer.save()
    ctx.body = {
      code: '200',
      data: newApprove,
      msg: '新建成功'
    }
  } catch (err) {
    ctx.body = {
      code: '403',
      data: null,
      msg: '新建失败'
    }
  }
}
async function update(ctx){
  const payload = ctx.request.body;
  const { id } = ctx.params;
  const curtime = moment().format('x');
  try {
    await approveModel.updateOne(
      {
        _id: id
      },
      {
        ...payload,
        latesttime: curtime
      }
    ).exec();
    ctx.body= {
      code: '200',
      data: {
        _id: id
      },
      msg: '更新成功'
    }
  } catch (err) {
    ctx.body = {
      code: '404',
      data: payload,
      msg: '更新失败，请核对数据id'
    }
  }
}
async function drop(ctx){
  const { id } = ctx.params;
  await approveModel.findOneAndRemove({
    _id: id
  })
  ctx.body = {
    code: '200',
    data: null,
    msg: '删除成功'
  }
}

module.exports = {
  list,
  get,
  create,
  update,
  drop
}
