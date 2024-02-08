import React from "react";

export default function CardUnity({
  title,
  description,
  image,
  releaseDate,
  director,
}) {
  return (
    <div className="flex items-center justify-center gap-5">
      <div className="flex flex-row flex-wrap gap-5 items-center justify-center mt-6">
        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {image && <img src={image} alt={title} className="mb-3" />}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {title}
            {description}
          </p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {releaseDate}
          </p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {director}
          </p>
          {/* Autres éléments ici si nécessaire */}
        </div>
      </div>
    </div>
  );
}
