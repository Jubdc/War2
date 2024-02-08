const AbstractManager = require("./AbstractManager");

class AwardsManager extends AbstractManager {
  constructor() {
    super({ table: "awards" });
  }

  async readAll() {
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);
    return rows;
  }

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );
    // Return the first row of the result, which represents the item
    return rows[0];
  }
}

module.exports = AwardsManager;
