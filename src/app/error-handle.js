const errorType = require('../constants/error-type')

const errorHandler = (err, ctx) => {
  let status, message
  switch (err.message) {
    case errorType.NAME_OR_PASSWORD_IS_REQUIRED:
      status = 400   // bad request
      message = '用户名或者密码不能为空~'
      break
    case errorType.USER_ALREADY_EXISTS:
      status = 409 // confilict
      message = '当前用户已存在~'
      break
    case errorType.USER_DOES_NOT_EXISTS:
      status = 400
      message = '当前用户名不存在~'
      break
    case errorType.PASSWORD_IS_ERROR:
      status = 400
      message = '用户密码错误~'
      break
    default: 
      status = 404
      message = 'NOT FOUND'
  }
  ctx.status = status;
  ctx.body = message
}

module.exports = errorHandler
