const { PRIVATE_KEY } = require('../app/config')
const jwt = require('jsonwebtoken')


class authController {
  async login (ctx, next) {
    const { id, name }= ctx.user
    // jwt 颁发签名
    const token = jwt.sign({id, name}, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24,
      algorithm: 'RS256'
    })
    ctx.body = {
      id,
      name,
      token
    }
  }

  async success (ctx, next) {
    ctx.body = '授权成功啦~'
  }
}

module.exports = new authController()
