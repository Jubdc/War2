/* eslint-disable  */
const express = require("express");

const router = express.Router();
const hashedPassword = require("../Middlewares/hashPassword");
const { validateUserData } = require("../Middlewares/validateUserData");
const { verifyToken } = require("../Middlewares/verifyToken");

const {
  browse,
  read,
  add,
  edit,
  addPoints,
  getScore, 
} = require("../controllers/userController");

router.get("/browse", browse); // Supposons que vous vouliez naviguer dans tous les utilisateurs
router.get("/:id", read); // Pour lire un utilisateur spécifique par ID
router.get("/edit/:id", edit); // Cette route n'est probablement pas correcte car 'edit' devrait être PUT ou PATCH
router.post("/", hashedPassword, validateUserData, add);
router.put("/:id/addPoints", verifyToken, addPoints);
router.get("/:id/score", verifyToken, getScore);

module.exports = router;


