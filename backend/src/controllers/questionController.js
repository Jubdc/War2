const tables = require("../tables");

// POUR AFFICHER LES FILMS

const browse = async (req, res) => {
  try {
    const todos = await tables.questions.readAll();
    res.json(todos);
  } catch (e) {
    console.error(e);
  }
};

// POUR SELECTIONNER UNE QUESTION ALEATOIREMENT DANS LA BDD

const getRandomQuestionWithAnswers = async (req, res, next) => {
  try {
    // Utiliser la méthode pour obtenir une question aléatoire et ses réponses
    const questionData = await tables.questions.getRandomQuestionWithAnswers();

    // Si aucune question n'est trouvée, répondre avec HTTP 404 (Not Found)
    if (questionData == null) {
      res.status(404).send("Question not found");
    } else {
      // Sinon, répondre avec la question et ses réponses en format JSON
      res.json(questionData);
    }
  } catch (err) {
    // Passer les erreurs éventuelles au middleware de gestion des erreurs
    next(err);
  }
};

// POUR AFFICHER PAR ID

const read = async (req, res, next) => {
  try {
    // Fetch a specific item from the database based on the provided ID
    const item = await tables.questions.read(req.params.id);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (item == null) {
      res.status(404).send("Question not found");
    } else {
      res.json(item);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

module.exports = { browse, read, getRandomQuestionWithAnswers };
