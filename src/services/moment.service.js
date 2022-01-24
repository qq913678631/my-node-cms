const connections = require('../app/database')

class momentService {
  async create (userId, content) {
    const statement = `INSERT INTO moment (user_id, content) VALUES (?, ?);`
    const res = await connections.execute(statement, [userId, content])
    return res[0]
  }

  async getMomentList (offset, size) {
    const statement = `
    SELECT
      m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
      JSON_OBJECT('id', u.id, 'name', u.name) user
    FROM moment m LEFT JOIN users u ON m.user_id = u.id
    LIMIT ?, ?;
    `
    const newOffset = offset * size
    const res = await connections.execute(statement, [newOffset.toString(), size])
    return res[0]
  }

  async getMonentById (momentId) {
    const statement = `
    SELECT 
      m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
      JSON_OBJECT('id', u.id, 'name', u.name) author
    FROM moment m LEFT JOIN users u ON m.user_id = u.id WHERE m.id = ?;
    `
    const [res] = await connections.execute(statement, [momentId])
    return res[0]
  }

  async updataMoment (momentId, content) {
    const statement = `
    UPDATE moment SET content = ? WHERE id = ?;
    `
    const [res] = await connections.execute(statement, [content, momentId])
    return res
  }

  async deleteMoment (momentId) {
    const statement = `
    DELETE FROM moment WHERE id = ?;
    `
    const [res] = await connections.execute(statement, [momentId])
    return res
  }
}

module.exports = new momentService()
