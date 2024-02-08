const express = require("express");

const router = express.Router();

const userRouter = require("./routers/userRouter");
const authRouter = require("./routers/authRouter");
const filmRouter = require("./routers/filmRouter");
const directorsRouter = require("./routers/directorsRouter");
const awardsRouter = require("./routers/awardsRouter");
const questionRouter = require("./routers/questionRouter");
const answersRouter = require("./routers/answersRouter");
// const chatBotRouter = require("./routers/chatBotRouter"); // Assurez-vous que le chemin est correct

router.use("/user", userRouter);
router.use("/login", authRouter);
router.use("/film", filmRouter);
router.use("/directors", directorsRouter);
router.use("/awards", awardsRouter);
router.use("/questions", questionRouter);
router.use("/answers", answersRouter);

// router.use("/chatbot", chatBotRouter);

module.exports = router;
