const connections = require('../app/database')

class commentService {
  async getCommentList (momentId) {
    const statement = `
    SELECT 
      c.id, c.content, c.comment_id commentId, c.creatAt createTime,
      JSON_OBJECT('userId', u.id, 'userName', u.name) user
    FROM comment c
    LEFT JOIN users u ON c.user_id = u.id
    WHERE moment_id = ?;
    `

    const [res] = await connections.execute(statement, [momentId])
    return res
  }

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
