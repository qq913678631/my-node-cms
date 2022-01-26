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
      JSON_OBJECT('id', u.id, 'name', u.name) user,
      (SELECT COUNT(*) FROM comment WHERE m.id = comment.moment_id) commentCount
    FROM moment m 
    LEFT JOIN users u ON m.user_id = u.id
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
      JSON_OBJECT('id', u.id, 'name', u.name) author,
      IF(COUNT(c.id),JSON_ARRAYAGG(
        JSON_OBJECT('id', c.id, 'content', c.content, 'commentId', c.comment_id, 'createTime', c.creatAt,
                    'user', JSON_OBJECT('id', cu.id, 'name', cu.name))
      ), NULL) comments,
      JSON_ARRAYAGG(
        JSON_OBJECT('id', l.id, 'name', l.name)
      ) labels
    FROM moment m 
    LEFT JOIN users u ON m.user_id = u.id
    LEFT JOIN comment c ON m.id = c.moment_id
    LEFT JOIN users cu ON c.user_id = cu.id
    LEFT JOIN moment_label ml ON m.id = ml.moment_id
    LEFT JOIN label l ON ml.label_id = l.id
    WHERE m.id = ?
    GROUP BY m.id;
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

  async hasLabel (momentId, labelId) {
    const statement = `
    SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ?;
    `

    const [res] = await connections.execute(statement, [momentId, labelId])
    return res
  }

  async addLabel (momentId, labelId) {
    const statement = `
    INSERT INTO moment_label (moment_id, label_id) VALUES (?, ?);
    `

    const [res]= await connections.execute(statement, [momentId, labelId])
    return res
  }
}

module.exports = new momentService()
