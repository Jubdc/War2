const express = require("express");

const router = express.Router();

const { login } = require("../controllers/authController");

// Route to add a new item
router.post("/", login);

module.exports = router;
