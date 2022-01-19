const { NAME_OR_PASSWORD_IS_REQUIRED, USER_DOES_NOT_EXISTS, PASSWORD_IS_ERROR } = require('../constants/error-type')
const authService = require('../services/auth.service')
const md5Password = require('../utils/password-handle')

const verifyLogin = async (ctx, next) => {
  // 1.获取用户名和密码
  const { name, password } = ctx.request.body

  // 2.判断用户账号密码是否为空
  if (!name || !password) {
    const error = new Error(NAME_OR_PASSWORD_IS_REQUIRED)
    return ctx.app.emit('error', error, ctx)
  }

  // 3.判断用户是否存在
  const res = await authService.getUserByName(name)
  if (!res.length) {
    const error = new Error(USER_DOES_NOT_EXISTS)
    return ctx.app.emit('error', error, ctx)
  }

  // 4.判断密码是否和数据库的密码一致(加密)
  if (md5Password(password) !== res[0].password) {
    const error = new Error(PASSWORD_IS_ERROR)
    return ctx.app.emit('error', error, ctx)
  }


  await next()
}

module.exports = {
  verifyLogin
}
