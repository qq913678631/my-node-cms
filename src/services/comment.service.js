const connections = require('../app/database')

class commentService {
  async create (momentId, userId, content) {
    const statement = `
    INSERT INTO comment (content, user_id, moment_id) VALUES (?, ?, ?);
    `
    
    const [res] = await connections.execute(statement, [content, userId, momentId])
    return res
  }

  async reply (momentId, userId, content, commentId) {
    const statement = `
    INSERT INTO comment (content, user_id, moment_id, comment_id) VALUES (?, ?, ?, ?);
    `

    const [res] = await connections.execute(statement, [content, userId, momentId, parseInt(commentId)])
    return res
  }

  async patch (commentId, content) {
    const statement = `
    UPDATE comment SET content = ? WHERE id = ?;
    `

    const [res] = await connections.execute(statement, [content, commentId])
    return res
  }

  async remove (commentId) {
    const statement = `
    DELETE FROM comment WHERE id = ?;
    `

    const [res] = await connections.execute(statement, [commentId])
    return res
  }
}

module.exports = new commentService()
