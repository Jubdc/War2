/* eslint-disable  */
import React, { useState } from "react";

function GameScore() {
  const [score, setScore] = useState(0);

  // Fonction pour augmenter le score
  const increaseScore = () => {
    setScore((prevScore) => prevScore + 100); // Par exemple, augmentez le score de 100 points à chaque fois
  };

  // Fonction pour diminuer le score
  const decreaseScore = () => {
    setScore((prevScore) => prevScore - 50); // Par exemple, diminuez le score de 50 points à chaque fois
  };

  return (
    <div>
      <h2>Score de la partie en cours : {score}</h2>
      <button onClick={increaseScore}>Augmenter le score</button>
      <button onClick={decreaseScore}>Diminuer le score</button>
    </div>
  );
}

export default GameScore;
