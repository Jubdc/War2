const { z } = require("zod");

const userSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  hashedPassword: z.string(),
});

const validateUserData = (req, res, next) => {
  const user = req.body;

  try {
    if (userSchema.parse(user)) next();
  } catch (e) {
    next(e);
  }
};

module.exports = { validateUserData };
