import React, { useState, useEffect } from "react";
import axios from "axios";

function awardsRoom() {
  const [award, setAward] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/directors`)
      .then((res) => {
        setAward(res.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the artwork", error);
      });
  }, []);

  return (
    <>
      <div className="flex justify-center text-4xl">
        <h1>Award's Room</h1>
      </div>
      <br />
      <div className="flex justify-center">
        <h2>Is there one better than others ?</h2>
      </div>

      <div className="bg-[url('./assets/wallpaper.png')] h-full min-h-screen">
        <div className="flex items-center justify-center gap-5">
          <div className="flex flex-row flex-wrap gap-5 items-center justify-center mt-6">
            {award.map((e) => (
              <div
                key={e.id}
                className="flex-row max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
              >
                <a href="#">
                  <img
                    className="rounded-t-lg"
                    src={e.image}
                    alt={e.lastname}
                    style={{
                      width: "300px",
                      height: "200px",
                      objectFit: "cover",
                    }}
                  />
                </a>
                <div className="p-5">
                  <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"></h5>
                  </a>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {e.lastname}frefef
                  </p>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    country : {e.country}
                  </p>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {e.birthDate}
                    {e.age}
                  </p>
                  <div className="flex justify-center gap-4 mt-4 ">
                    <button
                      href="#"
                      onClick={() => handleValidation(e.id)}
                      disabled={e.validated}
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Buy it !
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default awardsRoom;
