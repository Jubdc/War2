const tables = require("../tables");

// POUR AFFICHER LES FILMS

const browse = async (req, res) => {
  try {
    const todos = await tables.film.readAll();
    res.json(todos);
  } catch (e) {
    console.error(e);
  }
};

// POUR AFFICHER PAR ID

const read = async (req, res, next) => {
  try {
    // Fetch a specific item from the database based on the provided ID
    const item = await tables.film.read(req.params.id);

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

// POUR MODIFIER UN FILM

const edit = async (req, res) => {
  const { id } = req.params;
  const { title, description, image } = req.body;

  try {
    const updatedMovie = await tables.film.update({
      id,
      title,
      description,
      image,
    });

    if (updatedMovie === null) {
      res.status(404).send(`Film with id: ${id} not found`);
    } else {
      res.status(200).send(`Film with id: ${id} updated successfully`);
    }
  } catch (e) {
    res.status(500).send("Update operation failed");
  }
};
// POUR AJOUTER UN FILM

const add = async (req, res) => {
  const { title, description, image } = req.body;

  try {
    const insertId = await tables.film.create(title, description, image);
    res.status(201).json({ insertId });
  } catch (e) {
    console.error(e);
  }
};

// POUR SUPPRIMER UN FILM

const remove = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);

  try {
    // Check if the artwork with the given ID exists
    const deletedMovie = await tables.film.delete(id);

    // If the artwork is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with a success message.
    if (deletedMovie === null) {
      res.status(404).send(`Film with id: ${id} not found`);
    } else {
      res.status(200).send(`Film with id: ${id} deleted successfully`);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

module.exports = { browse, read, edit, add, remove };
