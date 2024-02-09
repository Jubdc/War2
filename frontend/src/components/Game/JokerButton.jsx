import React from "react";
import fifty from "../../assets/Joker.png";

function JokerButton({ selectedQuestion, answers, onUseJoker, jokerCount }) {
  // La fonction useJoker est définie comme une fonction fléchée.
  const useJoker = () => {
    console.log("useJoker called", { jokerCount, selectedQuestion });
    if (jokerCount > 0 && selectedQuestion) {
      // Filtre les réponses qui correspondent à la question sélectionnée.
      const validAnswers = answers.filter(
        (a) => a.question_id === selectedQuestion.id
      );

      // Filtre les réponses incorrectes parmi les réponses valides.
      const incorrectAnswers = validAnswers.filter((a) => !a.is_correct);

      // Recherche la réponse correcte parmi les réponses valides.
      const correctAnswer = validAnswers.find((a) => a.is_correct);

      // Effectue un mélange des réponses incorrectes en utilisant l'algorithme Fisher-Yates
      const shuffledIncorrectAnswers = fisherYates(incorrectAnswers).slice(
        0,
        1
      );

      const finalAnswers = [correctAnswer, ...shuffledIncorrectAnswers];

      // Appelle la fonction onUseJoker avec les réponses finales mélangées.
      onUseJoker(finalAnswers);

      // Assurez-vous que la fonction onUseJoker dans le composant parent gère correctement la logique pour décrémenter jokerCount
    }
  };

  // Définition de la fonction fisherYates pour le mélange
  function fisherYates(array) {
    let i = array.length,
      j,
      temp;
    while (--i > 0) {
      j = Math.floor(Math.random() * (i + 1));
      temp = array[j];
      array[j] = array[i];
      array[i] = temp;
    }
    return array;
  }

  return (
    <button
      onClick={useJoker}
      className={`mt-2 sticky bottom-0 ${
        jokerCount > 0 ? "" : "opacity-50 cursor-not-allowed"
      }`}
      disabled={jokerCount <= 0}
      style={{ height: "4rem", width: "4rem" }}
    >
      <img
        src={fifty}
        alt="Logo Joker"
        style={{ height: "100%", width: "100%" }}
      />
    </button>
  );
}

export default JokerButton;
