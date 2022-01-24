const Router = require('koa-router')

const momentRouter = new Router({prefix: '/moment'})
const { verifyAuth, verifyPermission } = require('../middleware/auth.middleware')
const { createMoment, list, detail, updata, remove } = require('../controller/moment.controller.js')

momentRouter.post('/', verifyAuth, createMoment)
momentRouter.get('/', list)
momentRouter.get('/:momentId', detail)
momentRouter.patch('/:momentId', verifyAuth, verifyPermission('moment'), updata)
momentRouter.delete('/:momentId', verifyAuth, verifyPermission('moment'), remove)


module.exports = momentRouter
