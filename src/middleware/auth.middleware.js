const jwt = require('jsonwebtoken')

const { NAME_OR_PASSWORD_IS_REQUIRED,
        USER_DOES_NOT_EXISTS,
        PASSWORD_IS_ERROR,
        UNAUTHORIZATION,
        UNPREMISSION
} = require('../constants/error-type')
const authService = require('../services/auth.service')
const md5Password = require('../utils/password-handle')
const { PUBLIC_KEY } = require('../app/config')

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
  ctx.user = res[0]
  await next()
}

const verifyAuth = async (ctx, next) => {
  console.log('验证授权的middleware');
  // 1.获取 token
  const authorization = ctx.headers.authorization
  if (!authorization) {
    const error = new Error(UNAUTHORIZATION)
    return ctx.app.emit('error', error, ctx)
  }
  const token = authorization.replace('Bearer ', '')
  // 2.验证 token

  try {
    const res = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ['RS256']
    })
    ctx.user = res
    await next()
  } catch (err) {
    const error = new Error(UNAUTHORIZATION)
    ctx.app.emit('error', error, ctx)
  }
}

const verifyPermission = (tableName) => {
  return async (ctx, next) => {
    // 1.获取查询参数
    const resourceId = Object.values(ctx.params)[0]
    const { id } = ctx.user

    console.log('%c█🚀🚀🚀   () -> :', 'color: #3ba776', resourceId, id)
    // 2.查看是否有操作权限
    const isPremission = await authService.checkResource(tableName, resourceId, id)
    console.log('%c█🚀🚀🚀   () -> :', 'color: #3ba776', isPremission)
    if (!isPremission) {
      const error = new Error(UNPREMISSION)
      return ctx.app.emit('error', error, ctx)
    }
  
    await next()
  }
}

module.exports = {
  verifyLogin,
  verifyAuth,
  verifyPermission
}
