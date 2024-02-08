const AbstractManager = require("./AbstractManager");

class AnswersManager extends AbstractManager {
  constructor() {
    super({ table: "answers" });
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
  // Nouvelle méthode pour obtenir le custom_message de la bonne réponse

  async getCorrectCustomMessage(questionId) {
    const [rows] = await this.database.query(
      `SELECT custom_message FROM ${this.table} WHERE question_id = ? AND is_correct = TRUE`,
      [questionId]
    );
    return rows.length ? rows[0].custom_message : null;
  }
}

module.exports = AnswersManager;
