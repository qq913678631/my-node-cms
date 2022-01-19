const { NAME_OR_PASSWORD_IS_REQUIRED, 
        USER_ALREADY_EXISTS } = require('../constants/error-type')
const userService = require('../services/user.service')
const md5Password = require('../utils/password-handle')

const verifyUser = async (ctx, next) => {
  // 1.获取用户名和密码
  const { name, password } = ctx.request.body

  // 2.判断用户名和密码不能为空
  if (!name || !password) {
    const error = new Error(NAME_OR_PASSWORD_IS_REQUIRED)
    return ctx.app.emit('error', error, ctx)
  }

  // 3.判断这次注册的用户名是没有被注册过
  const res = await userService.getUserByName(name)
  if (res.length) {
    const error = new Error(USER_ALREADY_EXISTS)
    return ctx.app.emit('error', error, ctx)
  }
  await next()
}

const hadnlePassword = async (ctx, next) => {
  const { password } = ctx.request.body
  // 1.对密码就行加密
  ctx.request.body.password = md5Password(password)

  await next()
}

module.exports = {
  verifyUser,
  hadnlePassword
}
