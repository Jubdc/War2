const AbstractManager = require("./AbstractManager");

class FilmManager extends AbstractManager {
  constructor() {
    super({ table: "film" });
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

  async update(id, title, description, image) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET title = ?, description = ?, image = ? WHERE id = ?`,
      [id, title, description, image, id]
    );

    return result.affectedRows;
  }

  async create(title, description, image) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (title, description, image) VALUES (?, ?, ?)`,
      [title, description, image]
    );
    return result.insertId;
  }

  async delete(id) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );

    return result.affectedRows;
  }
}

module.exports = FilmManager;
