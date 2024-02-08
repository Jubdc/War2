const tables = require("../tables");

const browse = async (req, res, next) => {
  try {
    const users = await tables.user.readAll();
    if (users.length) {
      res.json(users);
    } else {
      res.status(404).json({ message: "Aucun utilisateur trouvé" });
    }
  } catch (err) {
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await tables.user.read(id);
    if (user == null) {
      res.sendStatus(404);
    } else {
      res.json(user);
    }
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  const { name, email, hashedPassword } = req.body;

  try {
    const insertId = await tables.user.create({
      name,
      email,
      hashedPassword,
    });

    res
      .status(201)
      .json({ insertId, message: "Votre utilisateur a bien été créé" });
  } catch (e) {
    next(e);
  }
};

// The E of BREAD - Edit (Update) operation
const edit = async (req, res, next) => {
  const { id } = req.params;
  const {
    name,
    country,
    email,
    hashedPassword,
    favoriteMovies,
    favoriteDirectors,
  } = req.body;
  try {
    const result = await tables.user.update(
      name,
      country,
      email,
      hashedPassword,
      favoriteMovies,
      favoriteDirectors,
      id
    );
    if (result == null) {
      res.status(404).json({ message: "L'utilisateur n'existe pas" });
    } else {
      res.status(200).json({ message: "l'utilisateur a bien été modifié " });
    }
  } catch (err) {
    next(err);
  }
};

const addPoints = async (req, res, next) => {
  const { id } = req.params; // ID de l'utilisateur
  const { score } = req.body; // Points à ajouter

  try {
    // Lire les données actuelles de l'utilisateur
    const user = await tables.user.read(id);
    if (user == null) {
      res.status(404).json({ message: "L'utilisateur n'existe pas" });
      return;
    }

    // Calculer le nouveau score
    const newScore = user.score + score;

    // Mettre à jour uniquement le score de l'utilisateur
    const result = await tables.user.addPoints(id, newScore);

    // Répondre avec succès si la mise à jour a réussi
    if (result) {
      res.status(200).json({ message: "Points ajoutés avec succès" });
    } else {
      res
        .status(500)
        .json({ message: "Erreur lors de la mise à jour des points" });
    }
  } catch (err) {
    next(err);
  }
};

const getScore = async (req, res, next) => {
  try {
    const { id } = req.params;
    // Retrieve the score using the getScore method from the user table
    const score = await tables.user.getScore(id);
    if (score === undefined) {
      // If the score is undefined, it means the user ID doesn't exist
      res.status(404).json({ message: "L'utilisateur n'existe pas" });
    } else {
      // If the score is defined, return it in the response
      res.status(200).json({ score });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { browse, read, edit, add, addPoints, getScore };
