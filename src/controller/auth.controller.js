

class authController {
  async login (ctx, next) {
    const { name, password }= ctx.request.body
    ctx.body = `登录成功, 欢迎${ name }回来~`
  }
}

module.exports = new authController()
