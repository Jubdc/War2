const tables = require("../tables");

// POUR AFFICHER LES FILMS

const browse = async (req, res) => {
  try {
    const todos = await tables.directors.readAll();
    res.json(todos);
  } catch (e) {
    console.error(e);
  }
};

// POUR AFFICHER PAR ID

const read = async (req, res, next) => {
  try {
    // Fetch a specific item from the database based on the provided ID
    const item = await tables.directors.read(req.params.id);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (item == null) {
      res.sendStatus(404);
    } else {
      res.json(item);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

module.exports = { browse, read };
