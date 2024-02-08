const express = require("express");

const router = express.Router();

const {
  browse,
  read,
  getCorrectCustomMessage,
} = require("../controllers/answersController");

router.get("/", browse);
router.get("/:id", read);
router.get("/custom-message/:questionId", getCorrectCustomMessage);

module.exports = router;
