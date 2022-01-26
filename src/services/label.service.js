const connections = require('../app/database')

class labelService {
  async getLabelList (limit, offset) {
    const statement = `
    SELECT * FROM label LIMIT ?, ?;
    `

    const [res] = await connections.execute(statement, [offset, limit])
    return res
  }

  async create (labelName) {
    const statement = `
    INSERT INTO label (name) VALUES (?);
    `

    const [res] = await connections.execute(statement, [labelName])
    return res
  }

  async exists (labelName) {
    const statement = `
    SELECT * FROM label WHERE name=?;
    `

    const [res] = await connections.execute(statement, [labelName])
    return res
  }

  async updateLabel (labelId, labelName) {
    const statement = `
    UPDATE label SET name = ? WHERE id = ?;
    `

    const [res] = await connections.execute(statement, [labelName, labelId])
    return res
  }

  async removeLabel (labelId) {
    const statement = `
    DELETE FROM label WHERE id = ?;
    `
    
    const [res] = await connections.execute(statement, [labelId])
    return res
  }
}

module.exports = new labelService()
