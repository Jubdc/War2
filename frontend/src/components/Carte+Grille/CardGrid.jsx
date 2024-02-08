import React, { useState, useEffect } from "react";
import axios from "axios";
import CardUnity from "./CardUnity";

export default function CardGrid() {
  const [cardsData, setCardsData] = useState([]);

  useEffect(() => {
    // Assurez-vous que l'URL correspond à votre endpoint d'API
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/film`)
      .then((response) => {
        setCardsData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  return (
    <div className="mt-6 container mx-auto px-4 md:px-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {cardsData.map((e) => (
          <CardUnity
            key={e.id} // Assurez-vous que chaque élément de vos données a un attribut unique `id`
            image={e.image} // L'URL de l'image du film
            title={e.title} // Le titre du film
            description={e.description} // La description du film
            director={e.director}
            release_date={e.release_date}
          />
        ))}
      </div>
    </div>
  );
}
