import React, { useState } from "react";
import fifty from "../../assets/Joker.png";

function JokerButton({ selectedQuestion, answers, onUseJoker }) {
  const [jokerUsed, setJokerUsed] = useState(false);

  // Définition de la fonction fisherYates
  function fisherYates(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // La fonction useJoker est définie comme une fonction fléchée.
  const useJoker = () => {
    // Vérifie si le joker n'a pas encore été utilisé et s'il y a une question sélectionnée.
    if (!jokerUsed && selectedQuestion) {
      // Filtre les réponses qui correspondent à la question sélectionnée.
      const validAnswers = answers.filter(
        (a) => a.question_id === selectedQuestion.id
      );

      // Filtre les réponses incorrectes parmi les réponses valides.
      const incorrectAnswers = validAnswers.filter((a) => !a.is_correct);

      // Recherche la réponse correcte parmi les réponses valides.
      const correctAnswer = validAnswers.find((a) => a.is_correct);

      // Effectue un mélange des réponses incorrectes en utilisant l'algorithme Fisher-Yates
      // et prend la première réponse incorrecte dans la liste mélangée.
      const shuffledIncorrectAnswers = fisherYates(incorrectAnswers).slice(
        0,
        1
      );

      // Appelle la fonction onUseJoker en passant un tableau contenant la réponse correcte
      // et la réponse incorrecte mélangée comme arguments.
      onUseJoker([...shuffledIncorrectAnswers, correctAnswer]);

      const finalAnswers = fisherYates([
        ...shuffledIncorrectAnswers,
        correctAnswer,
      ]);

      // Appelle la fonction onUseJoker avec les réponses finales mélangées.
      onUseJoker(finalAnswers);

      // Définit la variable jokerUsed à true pour indiquer que le joker a été utilisé.
      setJokerUsed(true);
    }
  };

  return (
    <button
      onClick={useJoker}
      className={`mt-2 sticky bottom-0 ${
        jokerUsed ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={jokerUsed}
      style={{ height: "4rem", width: "4rem" }}
    >
      <img
        src={fifty}
        alt="Logo de tarantiknow"
        style={{ height: "100%", width: "100%" }}
      />
    </button>
  );
}

export default JokerButton;
