const Router = require('koa-router')

const momentRouter = new Router({prefix: '/moment'})
const { verifyAuth, verifyPermission } = require('../middleware/auth.middleware')
const { verifyLabel } = require('../middleware/label.middleware')
const { createMoment, list, detail, updata, remove, addLabels } = require('../controller/moment.controller.js')

// 新建动态
momentRouter.post('/', verifyAuth, createMoment)
// 获取动态列表
momentRouter.get('/', list)
// 获取某条动态详情
momentRouter.get('/:momentId', detail)
// 更改某条动态
momentRouter.patch('/:momentId', verifyAuth, verifyPermission('moment'), updata)
// 删除某条动态
momentRouter.delete('/:momentId', verifyAuth, verifyPermission('moment'), remove)

// 给动态添加标签
momentRouter.post('/:momentId/labels', verifyAuth, verifyPermission('moment'), verifyLabel, addLabels)

module.exports = momentRouter
