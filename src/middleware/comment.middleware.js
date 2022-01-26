const commentService = require('../services/comment.service')

class commentMiddleware {
  async getCommentList (ctx, next) {
    const { momentId } = ctx.request.query

    const res = await commentService.getCommentList(momentId)
    ctx.body = res
  }

  async create (ctx, next) {
    const { momentId, content } = ctx.request.body
    const { id } = ctx.user

    const res = await commentService.create(momentId, id, content)
    ctx.body = res
  }

  async reply (ctx, next) {
    const { momentId, content } = ctx.request.body
    const { commentId } = ctx.request.params
    const { id } = ctx.user

    const res = await commentService.reply(momentId, id, content, commentId)
    ctx.body = res
  }

  async patch (ctx, next) {
    const { content } = ctx.request.body
    const { commentId } = ctx.params

    const res = await commentService.patch(commentId, content)
    ctx.body = res
  }

  async remove (ctx, next) {
    const { commentId } = ctx.params

    const res = await commentService.remove(commentId)
    ctx.body = res
  }
}


module.exports = new commentMiddleware()
