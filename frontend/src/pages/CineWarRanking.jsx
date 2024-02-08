import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import ProgressBar from "../components/Game/ProgressBar";
import TimerComponent from "../components/Timer/TimerComponent";
import JokerButton from "../components/Game/JokerButton";
import ChatBot from "../components/Game/JokerBoat";

function CineWarRanking() {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });
  const [askedQuestionIds, setAskedQuestionIds] = useState([]);
  const [timerKey, setTimerKey] = useState(0); // TimerKey sert de clé unique au composant TimerComponent. Elle permet de sélectionner et remonter le composant si besoin.
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const totalQuestions = 10; // Mettez à jour selon votre logique

  const [jokerUsed, setJokerUsed] = useState(false);

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
    } catch (error) {
      console.error("Erreur lors de la mise à jour des points", error);
    }
  };

  function handleAnswerClick(answer) {
    setIsTimerRunning(false);
    const toastOptions = {
      position: "top-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      style: {}, // Ajoutez vos styles personnalisés ici
      onClose: () => {
        nextQuestion();
        setAlert({ show: false, message: "", type: "" });
        setTimerKey((prevKey) => prevKey + 1);
        // Mettre à jour le nombre de questions répondus
        setAnsweredQuestions((prev) => prev + 1);
      },
    };

    // Ajoutez des styles spécifiques pour les toasts de succès et d'erreur
    if (answer.is_correct) {
      setCorrectAnswers(correctAnswers + 1); // Ajouter 10% à la ProgressionBar
      updatePlayerPoints(auth.userId, 10);
      toast.success("Bien joué !", {
        ...toastOptions,
        className: "bg-green-500 text-white p-4 rounded-lg shadow-lg border",
      });
    } else {
      toast.error("Mauvaise réponse. Essayez encore.", {
        ...toastOptions,
        style: { backgroundColor: "red", color: "white" },
      });
    }

    // Pas besoin de setTimeout ici car onClose du toast s'en chargera
  }

  const handleJokerUse = (displayedAnswers) => {
    console.log("Joker button clicked");
    console.log("Réponses reçues dans onUseJoker:", displayedAnswers);
    setAnswers(displayedAnswers);
  };

  return (
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
        {selectedQuestion ? (
          <div>
            <div className="  mx-0 px-0 flex justify-center align-items mt-16">
              <h1>{selectedQuestion.question}</h1>
            </div>
            <div className=" grid grid-cols-2 grid-rows-3 gap-4 h-5/6 w-1/3 mx-auto  mt-48 w ">
              {answers
                .filter((answer) => answer.question_id === selectedQuestion.id)
                .slice(0, jokerUsed ? 2 : answers.length)
                .map((answer) => (
                  <button
                    type="button"
                    className="border row-span-1  col-span-1 "
                    key={answer.id}
                    onClick={() => handleAnswerClick(answer)}
                    disabled={!isTimerRunning} // Désactiver le bouton si le timer n'est pas en cours d'exécution
                  >
                    {answer.answer_text}
                  </button>
                ))}
            </div>
            <div className="  flex justify-end mx-0 px-0 w-45 h-56 absolute bottom-52 top-20 right-40 ml-24  z-10 w-50 h-64 ">
              <TimerComponent
                key={timerKey} // La clé aide React à identifier quand le composant doit être réinitialisé
                isPlaying={selectedQuestion != null && isTimerRunning} // Jouer seulement s'il y a une question sélectionnée
                duration={10} // La durée du timer en secondes
                onComplete={() => {
                  // Que faire quand le timer atteint 0
                  handleAnswerClick({ is_correct: false }); // Simule une mauvaise réponse
                }}
              />
            </div>
            <div className="position pr-52 flex justify-end ">
              <div className="grid grid-rows-2 gap-4">
                <div>
                  <ChatBot
                    currentQuestionId={
                      selectedQuestion ? selectedQuestion.id : null
                    }
                  />
                </div>
                <div>
                  <JokerButton
                    selectedQuestion={selectedQuestion}
                    answers={answers}
                    onUseJoker={handleJokerUse}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>Well Done, mate!</p> //PAS DE QUESTION A AFFICHER
        )}
      </div>
      <div className="">
        <ProgressBar current={correctAnswers} total={totalQuestions} />
      </div>
    </div>
  );
}

export default CineWarRanking;
