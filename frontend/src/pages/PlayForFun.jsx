/* eslint-disable  */

import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import ProgressBar from "../components/Game/ProgressBar";
import TimerComponent from "../components/Timer/TimerComponent";
import JokerButton from "../components/Game/JokerButton";
import ChatBot from "../components/Game/JokerBoat";

import NavBarGame from "../components/Game/NavBarGame";
import FooterGame from "../components/Game/FooterGame";
import UserScore from "../components/Timer/Score";

function QuestionGameForFun({ userId }) {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });
  const [askedQuestionIds, setAskedQuestionIds] = useState([]);
  const [timerKey, setTimerKey] = useState(0); // TimerKey sert de clé unique au composant TimerComponent. Elle permet de sélectionner et remonter le composant si besoin.
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const totalQuestions = 10; // Mettre à jour selon ma logique
  const [correctStreak, setCorrectStreak] = useState(0); // Nombre de bonnes réponses consécutives

  const [incorrectAnswersIndices, setIncorrectAnswersIndices] = useState([]);
  const [hiddenAnswersIds, setHiddenAnswersIds] = useState([]);

  const [jokerUsed, setJokerUsed] = useState(false);

  const [isTimerStoppedByBot, setIsTimerStoppedByBot] = useState(false);

  const [playerPoints, setPlayerPoints] = useState(0); // Pour afficher le score

  const { setShowNavAndFooter } = useOutletContext();

  useEffect(() => {
    // Masque la NavBar et le Footer à l'ouverture de la page
    setShowNavAndFooter(false);

    // Remettre la NavBar et le Footer à la fermeture de la page
    return () => setShowNavAndFooter(true);
  }, [setShowNavAndFooter]);

  // Arrête le timer quand je clique sur une question.*/
  const { auth } = useOutletContext();
  // Fonction pour mélanger un tableau en utilisant l'algorithme de Fisher-Yates
  function fisherYates(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  useEffect(() => {
    if (selectedQuestion) {
      // Filtrer et stocker les indices des réponses incorrectes
      const incorrectIndices = answers
        .filter((answer) => answer.question_id === selectedQuestion.id)
        .filter((answer) => !answer.is_correct)
        .map((answer) => answer.id);
      setIncorrectAnswersIndices(incorrectIndices);
      console.log("incorrectAnswersIndices:", incorrectIndices);
    }
    // ...
  }, [selectedQuestion, answers]);

  useEffect(() => {
    // console.log("askedQuestionIds:", askedQuestionIds); Pour voir la sauvegarde des Q dans la console.1/2
    console.log("askedQuestionIds:", askedQuestionIds);
    async function fetchData() {
      try {
        const [questionsResponse, answersResponse] = await axios.all([
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/questions`),
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/answers`),
        ]);

        const shuffledQuestions = fisherYates(questionsResponse.data);

        // Sélectionnez une question aléatoire parmi les questions mélangées
        const randomIndex = Math.floor(
          Math.random() * shuffledQuestions.length
        );
        setSelectedQuestion(shuffledQuestions[randomIndex]);
        setAnswers(answersResponse.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    }

    fetchData();
  }, [askedQuestionIds]);
  // [askedQuestionIds] Pour voir la sauvegarde des Questions dans la console.2/2

  function nextQuestion() {
    async function fetchNextQuestion() {
      try {
        const questionsResponse = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/questions`
        );
        setTimerKey((prevKey) => prevKey + 1);
        // Utilisation de shuffleArray pour mélanger les questions
        const shuffledQuestions = fisherYates(questionsResponse.data);

        let selected = null;
        for (const question of shuffledQuestions) {
          if (!askedQuestionIds.includes(question.id)) {
            selected = question;
            break;
          }
        }

        if (selected) {
          setSelectedQuestion(selected);
          // Mettez à jour les IDs des questions déjà posées
          setAskedQuestionIds((prevIds) => [...prevIds, selected.id]);
          setIsTimerRunning(true);
        } else {
          // Gérez le cas où toutes les questions ont été posées
          setSelectedQuestion(null);
          // Plus de questions disponibles
          setSelectedQuestion(null);
          setAlert({
            show: true,
            message:
              "Toutes les questions ont été posées. Merci de votre participation !",
            type: "info",
          });
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des questions pour la nouvelle question:",
          error
        );
      }
    }

    fetchNextQuestion();
  }

  const updatePlayerPoints = async (userId, pointsToAdd) => {
    // Assurez-vous que userId n'est pas undefined
    if (!userId) {
      console.error("L'ID de l'utilisateur est undefined.");
      return;
    }

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/${userId}/addPoints`,
        { score: pointsToAdd },
        { headers: { Authorization: `Bearer ${auth.token}` } }
      );
      console.log("Points ajoutés avec succès", response.data);
      setPlayerPoints((prevPoints) => prevPoints + pointsToAdd); //Pour afficher le score en temps réel
    } catch (error) {
      console.error("Erreur lors de la mise à jour des points", error);
    }
  };

  function handleAnswerClick(answer) {
    // Arrête le timer immédiatement lorsqu'une réponse est soumise
    setIsTimerRunning(false);

    const newStreak = answer.is_correct ? correctStreak + 1 : 0;
    setCorrectStreak(newStreak);

    let pointsToAdd = 100; // Points de base par question

    // Définit les options de toast ici pour pouvoir les réutiliser
    const toastOptions = {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      style: {
        backgroundColor: "black", // Définit la couleur de fond en noir
        color: "white", // Définit la couleur du texte en vert
        fontSize: "20px", // Augmente la taille de police
        padding: "20px", // Augmente le padding
        border: "5px",
      },
      onClose: () => {
        // Continue le jeu après la fermeture de n'importe quel toast
        continueGame();
      },
    };

    if (answer.is_correct) {
      // Applique le bonus de points en fonction du streak
      if (newStreak >= 4 && newStreak <= 6) {
        pointsToAdd = 200; // Du 4ème au 6ème inclus, le joueur gagne 200 points par question
      } else if (newStreak >= 7) {
        pointsToAdd = 400; // À partir du 7ème, le joueur gagne 400 points par question
      }

      updatePlayerPoints(auth.userId, pointsToAdd);

      setCorrectAnswers(correctAnswers + 1);

      // Affiche un toast spécial pour les streaks ou un toast normal sinon
      if (newStreak === 3 || newStreak === 6) {
        // Toast spécial pour les streaks importants
        toast.success(
          `Wow! ${newStreak} answers right in a row! You get a x2 bonus and will earn 200 points for good answers now!!!`,
          {
            ...toastOptions,
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: {
              backgroundColor: "black", // Définit la couleur de fond en noir
              color: "white", // Définit la couleur du texte en vert
              fontSize: "20px", // Augmente la taille de police
              padding: "20px", // Augmente le padding
              border: "5px",
            },
          }
        );
      } else {
        // Toast standard pour une bonne réponse
        toast.success(
          `Bonne réponse ! Points gagnés : ${pointsToAdd}`,
          toastOptions
        );
      }
    } else {
      // Réinitialise le streak en cas de réponse incorrecte et affiche un toast d'erreur
      setCorrectStreak(0);
      toast.error("Mauvaise réponse. Essayez encore.", toastOptions);
    }
  }

  function continueGame() {
    // Prépare le jeu pour continuer après la fermeture du toast
    nextQuestion();
    setAlert({ show: false, message: "", type: "" });
    setTimerKey((prevKey) => prevKey + 1); // Réinitialise le timer pour la nouvelle question
    setIsTimerRunning(true); // Redémarre le timer après la fermeture du toast
  }

  const handleJokerUse = () => {
    console.log("handleJokerUse called");

    // Vérifiez s'il y a suffisamment d'indices incorrects pour rendre invisibles deux réponses
    if (incorrectAnswersIndices.length >= 2) {
      // Sélectionnez les deux premiers identifiants des réponses incorrectes
      const idsToHide = incorrectAnswersIndices.slice(0, 2);

      // Mettez à jour l'état pour cacher ces réponses
      setHiddenAnswersIds(idsToHide);

      // Marquez le joker comme utilisé
      setJokerUsed(true);
    } else {
      console.log("Pas assez de réponses incorrectes pour utiliser le joker.");
    }
  };

  const handleBotUse = () => {
    console.log("Bot Joker utilisé");
    setIsTimerRunning(false);
    setIsTimerStoppedByBot(true); // Indique que le timer est arrêté par le bot

    toast.info("13 secondes de pause !", {
      position: "bottom-center",
      autoClose: 13000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      style: {
        backgroundColor: "black", // Définit la couleur de fond en noir
        color: "white", // Définit la couleur du texte en vert
        fontSize: "20px", // Augmente la taille de police
        padding: "10px", // Augmente le padding
        border: "5px",
      },
    });

    // Redémarrer le timer après un délai, si nécessaire
    setTimeout(() => {
      setIsTimerRunning(true);
      setIsTimerStoppedByBot(false); // Réinitialise lorsque le timer est redémarré
    }, 14000); // Exemple: redémarrer après 10 secondes
  };

  return (
    <div>
      <div>
        <NavBarGame />
      </div>
      <div className=" bg-[url('./assets/bgps.png')] bg-fixed bg-center min-h-full bg-no-repeat bg-cover">
        <div>
          {alert.show && (
            <div
              className={`alert ${
                alert.type === "success" ? "alert-success" : "alert-danger"
              }`}
            >
              {alert.message}
            </div>
          )}

          <div>
            <div>
              <p>Points: {playerPoints}</p>
            </div>

            {selectedQuestion ? (
              <div>
                <div className=" font-avant-garde font-medium flex justify-center items-center text-xl pt-5 pl-10 ">
                  <div className=" flex justify-center items-center h-28 w-1/2  border-4 border-blue-500 transition-all duration-300 hover:border-red- transform hover:scale-105 rounded-tl-[500px] rounded-tr-[150px] rounded-br-[500px] rounded-bl-[150px]">
                    <h1 className=" flex justify-center items-center h-20 w-5/6 text-white text-2xl text-center ">
                      {selectedQuestion.question}
                    </h1>
                  </div>
                  <div className=" flex justify-center w-10 translate-x-12 p-1 items-center mt-4 border-2 border-blue-500 rounded-tl-[200px] rounded-tr-[200px] rounded-br-[200px] rounded-bl-[200px]  ">
                    <div className="text-white text-lg font-semibold">
                      {correctAnswers}
                    </div>
                  </div>
                </div>
                <div className="  flex justify-center items-center h-20 m-0 p-0">
                  <div className=" w-full mt-4">
                    <ProgressBar
                      current={correctAnswers}
                      total={totalQuestions}
                    />
                  </div>
                </div>
                <div className=" relative grid grid-cols-2 gap-5 w-2/5 mx-auto pb-16 text-white font-avant-garde text-xl whitespace-normal break-words">
                  {answers
                    .filter(
                      (answer) => answer.question_id === selectedQuestion.id
                    )
                    .slice(0, 1) // Prendre seulement les deux premières réponses
                    .map((answer) => (
                      <button
                        type="button"
                        key={answer.id}
                        className={`bg-transparent transition-all duration-300 h-20 w-full whitespace-normal break-words border-4 border-cyan-400 hover:border-blue-800 rounded-tl-[150px] rounded-tr-[500px] rounded-br-[150px] rounded-bl-[500px] transform hover:scale-105${
                          hiddenAnswersIds.includes(answer.id)
                            ? "opacity-0"
                            : ""
                        }`}
                        onClick={() => handleAnswerClick(answer)}
                        disabled={
                          (!isTimerRunning && !isTimerStoppedByBot) ||
                          hiddenAnswersIds.includes(answer.id)
                        }
                        style={{
                          visibility: hiddenAnswersIds.includes(answer.id)
                            ? "hidden"
                            : "visible",
                        }}
                      >
                        <h1 className="flex justify-center items-center text-xl h-20 w-5/6 text-white text-base ml-5 text-center ">
                          {answer.answer_text}
                        </h1>
                      </button>
                    ))}

                  {/* Groupe 2 - Les deux autres boutons */}

                  {answers

                    .filter(
                      (answer) => answer.question_id === selectedQuestion.id
                    )
                    .slice(1, 2) // Prendre les réponses après les deux premières
                    .map((answer) => (
                      <button
                        type="button"
                        key={answer.id}
                        className={`g-transparent transition-all duration-300 h-20 w-full whitespace-normal break-words border-4 border-cyan-400  hover:border-blue-800 transform hover:scale-105 rounded-tl-[500px] rounded-tr-[150px] rounded-br-[500px] rounded-bl-[150px]  z-30 ${
                          hiddenAnswersIds.includes(answer.id)
                            ? "opacity-0"
                            : ""
                        }`}
                        onClick={() => handleAnswerClick(answer)}
                        disabled={
                          (!isTimerRunning && !isTimerStoppedByBot) ||
                          hiddenAnswersIds.includes(answer.id)
                        }
                        style={{
                          visibility: hiddenAnswersIds.includes(answer.id)
                            ? "hidden"
                            : "visible",
                        }}
                      >
                        <h1 className=" flex justify-center items-center text-xl h-20 w-5/6 text-white text-base ml-5 text-center ">
                          {answer.answer_text}
                        </h1>
                      </button>
                    ))}

                  {answers
                    .filter(
                      (answer) => answer.question_id === selectedQuestion.id
                    )
                    .slice(2, 3) // Prendre les réponses après les deux premières
                    .map((answer) => (
                      <button
                        type="button"
                        key={answer.id}
                        className={`g-transparent transition-all duration-300 h-20 w-full whitespace-normal break-words border-4 border-cyan-400  hover:border-blue-800 transform hover:scale-105 rounded-tl-[500px] rounded-tr-[150px] rounded-br-[500px] rounded-bl-[150px]  z-30 ${
                          hiddenAnswersIds.includes(answer.id)
                            ? "opacity-0"
                            : ""
                        }`}
                        onClick={() => handleAnswerClick(answer)}
                        disabled={
                          (!isTimerRunning && !isTimerStoppedByBot) ||
                          hiddenAnswersIds.includes(answer.id)
                        }
                        style={{
                          visibility: hiddenAnswersIds.includes(answer.id)
                            ? "hidden"
                            : "visible",
                        }}
                      >
                        <h1 className=" flex justify-center items-center text-xl h-20 w-5/6 text-white text-base ml-5 text-center ">
                          {answer.answer_text}
                        </h1>
                      </button>
                    ))}
                  {answers
                    .filter(
                      (answer) => answer.question_id === selectedQuestion.id
                    )
                    .slice(3, 4) // Prendre les réponses après les deux premières
                    .map((answer) => (
                      <button
                        type="button"
                        key={answer.id}
                        className={`bg-transparent transition-all duration-300 h-20 w-full whitespace-normal break-words border-4 border-cyan-400 hover:border-blue-800 rounded-tl-[150px] rounded-tr-[500px] rounded-br-[150px] rounded-bl-[500px] transform hover:scale-105 z-30 ${
                          hiddenAnswersIds.includes(answer.id)
                            ? "opacity-0"
                            : ""
                        }`}
                        onClick={() => handleAnswerClick(answer)}
                        disabled={
                          (!isTimerRunning && !isTimerStoppedByBot) ||
                          hiddenAnswersIds.includes(answer.id)
                        }
                        style={{
                          visibility: hiddenAnswersIds.includes(answer.id)
                            ? "hidden"
                            : "visible",
                        }}
                      >
                        <h1 className=" flex justify-center items-center text-xl h-20 w-5/6 text-white text-base ml-5 text-center ">
                          {answer.answer_text}
                        </h1>
                      </button>
                    ))}
                  <div className="flex justify-end  w-full absolute top-0  ml-56 mb-12 w-50 ">
                    <TimerComponent
                      key={timerKey} // La clé aide React à identifier quand le composant doit être réinitialisé
                      isPlaying={selectedQuestion != null && isTimerRunning} // Jouer seulement s'il y a une question sélectionnée
                      duration={15} // La durée du timer en secondes
                      onComplete={() => {
                        // Que faire quand le timer atteint 0
                        handleAnswerClick({ is_correct: false }); // Simule une mauvaise réponse
                      }}
                    />
                  </div>
                </div>

                <div className="absolute left-0 right-0 flex justify-center items-center h-26 m-0 pt-22 p-6 bg-transparent transition-all duration-300 h-24 w-full whitespace-normal break-words ">
                  <ChatBot
                    currentQuestionId={
                      selectedQuestion ? selectedQuestion.id : null
                    }
                    handleBotUse={handleBotUse}
                  />
                </div>

                <div className="absolute left-10 right-0  -translate-y-1 pt-24 flex justify-center items-center h-20 m-0 p-0 mr-80  transition-all duration-300 transform hover:scale-105 ">
                  <JokerButton
                    selectedQuestion={selectedQuestion}
                    answers={answers}
                    onUseJoker={handleJokerUse}
                  />
                </div>
              </div>
            ) : (
              // Message affiché lorsque toutes les questions ont été posées
              <div className="text-center mt-20">
                <h2 className="text-xl font-semibold">
                  Toutes les questions ont été posées. Merci de votre
                  participation !
                </h2>
              </div>
            )}
          </div>

          <div className="flex flex-col min-h-60 overflow-hidden ">
            <FooterGame />
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionGameForFun;
