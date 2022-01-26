const labelService = require('../services/label.service')

class labelMiddlewar {
  async verifyLabel (ctx, next) {
    // 1.取出选中的所有标签
    const { labels } = ctx.request.body

    // 2.判断每一个标签在label中是否存在
    const labelList = []
    for (let name of labels) {
      const res = await labelService.exists(name)
      const label = { name }
      if (!res.length) {
        // 新建一个新的标签
        const newLabel = await labelService.create(name)
        label.id = newLabel.insertId
      } else {
        label.id = res[0].id
      }
      labelList.push(label)
    }
    ctx.labels = labelList
    await next()
  }
}

module.exports = new labelMiddlewar()
