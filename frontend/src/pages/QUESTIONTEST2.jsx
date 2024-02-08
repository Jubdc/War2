import React, { useState, useEffect } from "react";
import axios from "axios";

function AlphaWork() {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [questionsResponse, answersResponse] = await axios.all([
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/questions`),
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/answers`),
        ]);

        const shuffledQuestions = questionsResponse.data.sort(
          () => 0.5 - Math.random()
        );
        setSelectedQuestion(shuffledQuestions[0]);
        setAnswers(answersResponse.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    }

    fetchData();
  }, []);

  /// NE FONCTIONNE PAS CAR BESOIN DE L'ID DU JOUEUR

  function scoreValidation(isCorrect, answerId) {
    if (isCorrect) {
      const pointsToAdd = 250;
      // Supposons que vous avez l'ID de l'utilisateur connecté stocké quelque part
      const userId = "ID_OF_CURRENT_USER"; // Remplacez par l'ID réel de l'utilisateur connecté

      axios
        .put(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/${userId}/addscore`,
          {
            score: pointsToAdd,
          }
        )
        .then((response) => {
          alert("Bonne réponse ! 250 points distribués au joueur.");
        })
        .catch((error) => {
          console.error("Erreur lors de l'ajout des points:", error);
        });
    } else {
      alert("Mauvaise réponse, essayez encore !");
    }
  }

  /// NE FONCTIONNE PAS CAR BESOIN DE L'ID DU JOUEUR DISTRBUÉ PAR UN CONTEXT AUTHENTIFICATEUR

  function nextQuestion() {
    async function fetchNextQuestion() {
      try {
        const questionsResponse = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/questions`
        );
        const shuffledQuestions = questionsResponse.data.sort(
          () => 0.5 - Math.random()
        );
        setSelectedQuestion(shuffledQuestions[0]);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des questions pour la nouvelle question:",
          error
        );
      }
    }

    /// NE FONCTIONNE PAS CAR BESOIN DE L'ID DU JOUEUR DISTRBUÉ PAR UN CONTEXT AUTHENTIFICATEUR

    fetchNextQuestion();
  }

  function handleAnswerClick(answerId) {
    scoreValidation(answerId); // Valider le score pour l'ID de réponse donné
    nextQuestion(); // Passer à la question suivante
  }

  return (
    <div>
      {selectedQuestion ? (
        <div>
          <h2>Question:</h2>
          <div className="flex justify-center">
            <p>{selectedQuestion.question}</p>
          </div>
          <div className="flex justify-center items-center w-90 h-20">
            {answers
              .filter((answer) => answer.question_id === selectedQuestion.id)
              .map((answer) => (
                <button
                  type="button"
                  className="flex justify-center items-center border w-60 h-20 m-1"
                  key={answer.id}
                  onClick={() => handleAnswerClick(answer.id)}
                >
                  {answer.answer_text}
                </button>
              ))}
          </div>
        </div>
      ) : (
        <p>Pas de question à afficher.</p>
      )}
    </div>
  );
}

export default AlphaWork;
