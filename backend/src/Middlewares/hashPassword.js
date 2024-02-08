/* eslint-disable  */
const argon2 = require("argon2");

const hashPassword = async (req, res, next) => {
  const hashedPassword = await argon2.hash(req.body.password);

  delete req.body.password;

  req.body.hashedPassword = hashedPassword;

  next();
};

module.exports = hashPassword;
