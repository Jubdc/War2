const AbstractManager = require("./AbstractManager");

class QuestionManager extends AbstractManager {
  constructor() {
    super({ table: "questions" });
  }

  async readAll() {
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);
    return rows;
  }

  async getRandomQuestionWithAnswers() {
    // Sélectionner une question aléatoire
    const [questions] = await this.database.query(
      `SELECT * FROM ${this.table} ORDER BY RAND() LIMIT 1`
    );

    if (questions.length === 0) {
      return null;
    }

    const question = questions[0];

    // Récupérer les réponses pour cette question
    const [answers] = await this.database.query(
      `SELECT * FROM answers WHERE question_id = ?`,
      [question.id]
    );

    return { question, answers };
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

module.exports = QuestionManager;
