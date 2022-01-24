const Router = require('koa-router')
const { verifyAuth, verifyPermission } = require('../middleware/auth.middleware')
const { create, reply, patch, remove } = require('../middleware/comment.middleware')

const commentRouter = new Router({prefix: '/comment'})

commentRouter.post('/', verifyAuth, create)
// 回复评论
commentRouter.post('/:commentId/reply', verifyAuth, reply)
// 修改评论
commentRouter.patch('/:commentId', verifyAuth, verifyPermission('comment'), patch)
// 删除评论
commentRouter.delete('/:commentId', verifyAuth, verifyPermission('comment'), remove)


module.exports = commentRouter
