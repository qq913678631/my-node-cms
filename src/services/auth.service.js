const connections = require('../app/database')

class authService {
  async getUserByName(name) {
    const statement = `SELECT * FROM users WHERE name = ?;`
    const res = await connections.execute(statement, [name])
    return res[0]
  }
}

module.exports = new authService();
