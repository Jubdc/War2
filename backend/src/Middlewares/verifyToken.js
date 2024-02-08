const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    const authorizationHeader = req.get("Authorization");
    if (authorizationHeader == null) {
      throw new Error("Authorization header is missing");
    }
    const [type, token] = authorizationHeader.split(" ");
    if (type !== "Bearer") {
      throw new Error("Authorization header is not of type 'Bearer'");
    }
    // Vérifier la validité du token (son authenticité et sa date d'expiration)
    // En cas de succès, le payload est extrait et décodé
    req.auth = jwt.verify(token, process.env.APP_SECRET); // Correction ici
    next();
  } catch (err) {
    res.sendStatus(401); // Correction de l'ordre et de la faute de frappe ici
    next(err);
  }
};

module.exports = { verifyToken };
