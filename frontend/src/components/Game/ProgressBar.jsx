import React, { useState, useEffect } from "react";
import tarantino from "../../assets/Tarantiknow.png"; // Importez la première image ici
import fifty from "../../assets/Joker.png"; // Importez la deuxième image ici

export default function ProgressBar({ current, total }) {
  const maxProgress = 5; // Nombre maximum de questions avant que la barre de progression ne soit remplie à 100%
  const [progress, setProgress] = useState(0); // État pour suivre le progrès de la barre
  const [isFirstLogo, setIsFirstLogo] = useState(true); // État pour suivre le logo actuel
  const [barColor, setBarColor] = useState("bg-yellow-500"); // Couleur de la barre

  useEffect(() => {
    // Calcul du progrès en tenant compte des cycles complets de questions
    const completedCycles = Math.floor(current / maxProgress);
    const remainingQuestionsInCycle = current % maxProgress;
    const newProgress = (remainingQuestionsInCycle / maxProgress) * 100;

    // Si le reste des questions est de 0, la barre doit être jaune
    if (remainingQuestionsInCycle === 0) {
      setProgress(0); // Définit la progression à 0
    } else {
      setProgress(newProgress);
    }

    // Si le nombre de questions répondues est supérieur au total, réinitialiser la progression
    if (current > total) {
      setProgress(0);
    }

    // Vérifiez si vous avez atteint un palier de cinq questions
    if (current % maxProgress === 0 && current !== 0) {
      // Alterner entre les logos à chaque palier de cinq questions
      setIsFirstLogo((prevIsFirstLogo) => !prevIsFirstLogo);

      // Changer la couleur de la barre toutes les cinq questions
      setBarColor((prevColor) => {
        switch (prevColor) {
          case "bg-yellow-500":
            return "bg-orange-500";
          case "bg-orange-500":
            return "bg-purple-500";
          case "bg-purple-500":
            return "bg-green-500";
          case "bg-green-500":
            return "bg-blue-500";
          case "bg-blue-500":
            return "bg-yellow-500";
          default:
            return "bg-yellow-500";
        }
      });
    }
  }, [current, total]);

  // Déterminez quel logo utiliser en fonction de l'état isFirstLogo
  const logoToShow = isFirstLogo ? fifty : tarantino;

  // Calcul du prochain palier en prenant en compte le prochain palier après le total actuel
  const nextMilestone = Math.ceil((current + 1) / maxProgress) * maxProgress;

  return (
    <>
      <div className="flex justify-center mb-1 text-base font-medium dark:text-white gap-3">
        <div className="flex items-center">
          <div className="w-64 bg-gray-200 rounded-full h-2 mb-4 dark:bg-gray-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover-glow">
            <div
              className={`h-2 rounded-full hover-glow ${barColor}`}
              style={{
                width: `${progress}%`,
                transition: "width 0.5s ease-in-out",
              }}
            ></div>
          </div>
          <div className="mr-2 mb-4">{`${current}/${nextMilestone}`} </div>
          <img
            src={logoToShow}
            alt="Bonus Logo"
            className="w-8 h-8 mr-1 mb-4"
          />{" "}
        </div>
      </div>
    </>
  );
}
