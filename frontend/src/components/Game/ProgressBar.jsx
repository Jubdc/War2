import React from "react";

export default function ProgressBar({ current, total }) {
  const progress = (current / total) * 100; // Calcule le pourcentage de progression

  return (
    <>
      <div className="flex justify-center mb-1 text-base font-medium dark:text-white">
        <div className=" w-64 bg-gray-200 rounded-full h-2 mb-4 dark:bg-gray-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover-glow">
          <div
            className="bg-red-500 h-2 rounded-full hover-glow "
            style={{
              width: `${progress}%`,
              transition: "width 0.5s ease-in-out",
            }} // Utilise le pourcentage calculé pour la largeur + Applique une transition fluide
          ></div>
        </div>
      </div>
    </>
  );
}
