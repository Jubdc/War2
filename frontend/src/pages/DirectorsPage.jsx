import React, { useState, useEffect } from "react";
import axios from "axios";

function DirectorsPage() {
  const [filmMakers, setFilmMakers] = useState([]);

  const [filterFilmMakers, setFilterFilmMakers] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    // Récupérer les données initiales des réalisateurs
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/directors`)
      .then((res) => {
        setFilmMakers(res.data);
        setFilterFilmMakers(res.data); // Initialisez également l'état filtré avec tous les réalisateurs
      })
      .catch((error) => {
        console.error("There was an error fetching the directors", error);
      });
  }, []);

  useEffect(() => {
    // Filtrer les réalisateurs à chaque changement de la valeur de recherche
    if (searchValue === "") {
      // Si la barre de recherche est vide, remontrez tous les réalisateurs
      setFilterFilmMakers(filmMakers);
    } else {
      // Sinon, filtrez la liste des réalisateurs en fonction de la valeur de recherche
      const filtered = filmMakers.filter((e) =>
        e.lastname.toLowerCase().startsWith(searchValue.toLowerCase())
      );
      setFilterFilmMakers(filtered);
    }
  }, [searchValue, filmMakers]); // Dépendances du useEffect : searchValue et filmMakers
  // Déclenchement de l'effet : useEffect exécutera la fonction de rappel (callback) qu'il contient chaque fois qu'une des valeurs dans cette liste de dépendances change. Dans votre cas, la fonction à l'intérieur de useEffect sera appelée chaque fois que searchValue ou filmMakers change.

  // Gestionnaire pour la barre de recherche
  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  // ... (le reste de votre composant DirectorsPage)

  return (
    <>
      <div className="flex justify-center text-4xl">
        <h1>Directors's Page</h1>
      </div>
      <br />
      <div className="flex justify-center">
        <h2>
          Choose your 10 favorite filmmakers to show us what kind of cinema you
          like!
        </h2>
      </div>
      <div className="flex flex-row justify-center my-6 gap-4">
        <input
          type="text"
          placeholder=""
          value={searchValue}
          onChange={handleSearch}
          className="search-bar"
        />
      </div>

      <div className="flex flex-row flex-wrap justify-center gap-4">
        {filterFilmMakers.length > 0 ? (
          filterFilmMakers.map((e) => (
            <div key={e.id} className="card-style">
              <img
                className="rounded-t-lg"
                src={e.image}
                alt={`Portrait de ${e.lastname}`}
                style={{ width: "300px", height: "200px", objectFit: "cover" }}
              />
              <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {e.lastname}, {e.firstname}
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Pays : {e.country}
                </p>
                {/* Autres détails du réalisateur */}
                <button className="" type="button">
                  Add to your HolyWood
                </button>
              </div>
            </div>
          ))
        ) : (
          <h1 className="text-2xl my-16">
            Sorry, no filmmakers match your criteria.
          </h1>
        )}
      </div>
    </>
  );
}

export default DirectorsPage;
