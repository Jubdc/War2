/* eslint-disable  */
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

// Import access to database tables
const tables = require("../tables");

const login = async (req, res, next) => {
  try {
    // Fetch a specific user from the database based on the provided email
    const user = await tables.user.readbyEmailWithPassword(req.body.email);
    if (user == null) {
      res.sendStatus(422);
    }
    const verified = argon2.verify(user.hashedPassword, req.body.password);
    if (verified) {
      delete user.hashedPassword;

      const token = await jwt.sign(
        { sub: user.id, email: user.email },
        process.env.APP_SECRET,
        { expiresIn: "12h" }
      );

      res.status(200).json({ token, user });
    } else {
      res.sendStatus(422);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  login,
};
