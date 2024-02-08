const express = require("express");

const router = express.Router();

const {
  browse,
  read,
  getRandomQuestionWithAnswers,
} = require("../controllers/questionController");

router.get("/RandomQuestion", getRandomQuestionWithAnswers);
router.get("/", browse);
router.get("/:id", read);

module.exports = router;
