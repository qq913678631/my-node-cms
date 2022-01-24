const connections = require('../app/database')

class authService {
  async getUserByName (name) {
    const statement = `SELECT * FROM users WHERE name = ?;`
    const res = await connections.execute(statement, [name])
    return res[0]
  }

  async checkResource (tableName, id, userId) {
    const statement = `
    SELECT * FROM ${ tableName } WHERE id = ? AND user_id = ?;
    `
    
    const [res] = await connections.execute(statement, [id, userId])
    if (res.length) {
      return res[0]
    }
    return false
  }
}

module.exports = new authService();
