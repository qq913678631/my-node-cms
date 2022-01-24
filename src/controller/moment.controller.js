const momentService = require('../services/moment.service')

class MomentController {
  async createMoment (ctx, next) {
    // 1.获取数据(user_id, content, 图片?)
    const userId = ctx.user.id
    const content = ctx.request.body.content

    // 2.将数据插入数据库
    const res = await momentService.create(userId, content)
    ctx.body = res
  }

  async list (ctx, next) {
    // 通过数据库查询分页的moment
    const { offset, size } = ctx.request.query
    
    const res = await momentService.getMomentList(offset, size)
    ctx.body = res
  }

  async detail (ctx, next) {
    // 1.获取需要查询的momentId
    const { momentId } = ctx.request.params
    
    // 2.通过数据库查询该条moment
    const res = await momentService.getMonentById(momentId)
    ctx.body = res
  }

  async updata (ctx, next) {
    // 1. 获取参数
    const { momentId } = ctx.params
    const { content } = ctx.request.body

    // 2. 修改内容
    const res = await momentService.updataMoment(momentId, content)
    ctx.body = res
  }

  async remove (ctx, next) {
    // 1. 获取参数
    const { momentId } = ctx.params
    
    // 2. 删除对应的moment
    const res = await momentService.deleteMoment(momentId)
    ctx.body = res
  }
}

module.exports = new MomentController()
