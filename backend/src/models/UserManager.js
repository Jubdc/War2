const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "user" as configuration
    super({ table: "user" });
  }

  // The C of CRUD - Create operation

  async create(user) {
    // Execute the SQL INSERT query to add a new item to the "user" table
    const [result] = await this.database.query(
      `insert into ${this.table} (name, email, hashedPassword) values (?,?,?)`,
      [user.name, user.email, user.hashedPassword]
    );
    // Return the ID of the newly inserted user
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the item
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all items from the "item" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of items
    return rows;
  }

  async readbyEmailWithPassword(email) {
    const [rows] = await this.database.query(
      `SELECT * FROM user WHERE email = ?`,
      [email]
    );
    return rows[0];
  }

  async addPoints(id, score) {
    const [result] = await this.database.query(
      "UPDATE user SET score = ? WHERE id = ?",
      [score, id]
    );
    return result.affectedRows;
  }

  async getScore(id) {
    const [rows] = await this.database.query(
      `SELECT score FROM ${this.table} WHERE id = ?`,
      [id]
    );
    // Retourne le score de l'utilisateur
    return rows[0].score;
  }
}

module.exports = UserManager;
