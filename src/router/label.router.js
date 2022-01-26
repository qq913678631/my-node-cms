const Router = require('koa-router')

const { verifyAuth, verifyPermission } = require('../middleware/auth.middleware')
const { list, create, update, remove } = require('../controller/label.controller')
const labelRouter = new Router({prefix: '/label'})

// 获取标签列表
labelRouter.get('/', list)
// 新建标签
labelRouter.post('/', verifyAuth, create)
// 修改标片
labelRouter.patch('/:labelId', verifyAuth, update)
// 删除标配
labelRouter.delete('/:labelId', verifyAuth, remove)


module.exports = labelRouter
