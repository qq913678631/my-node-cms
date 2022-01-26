const labelService = require('../services/label.service')

class labelController {
  async list (ctx, next) {
    const { limit , offset } = ctx.query

    const res = await labelService.getLabelList(limit, offset)
    ctx.body = res
  }

  async create (ctx, next) {
    const { labelName } = ctx.request.body

    const res = await labelService.create(labelName)
    ctx.body = res
  }

  async update (ctx, next) {
    const { labelId } = ctx.params
    const { labelName } = ctx.request.body

    const res = await labelService.updateLabel(labelId, labelName)
    ctx.body = res
  }

  async remove (ctx, next) {
    const { labelId } = ctx.params
    
    const res = await labelService.removeLabel(labelId)
    ctx.body = res
  }
}

module.exports = new labelController()
