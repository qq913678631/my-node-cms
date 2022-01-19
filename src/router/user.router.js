const Router = require('koa-router')
const { create } = require('../controller/user.controller')
const { verifyUser, hadnlePassword } = require('../middleware/user.middleware')
const userRouter = new Router({prefix: '/users'});

userRouter.post('/', verifyUser, hadnlePassword, create)

module.exports = userRouter;
