import { NavLink } from "react-router-dom";
import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import ChooseMode from "../assets/ChooseMode.png";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const { setShowNavAndFooter } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    setShowNavAndFooter(true);
  }, [setShowNavAndFooter]);

  const handleNavLinkClick = (event) => {
    event.stopPropagation(); // Cela empêche l'événement de clic de se propager au div parent.
  };

  return (
    <>
      <div
        className="text-white font-light bg-[url('./assets/HomeBlurry.png')] bg-fixed bg-center min-h-screen w-full h-full bg-no-repeat bg-cover flex justify-center items-center"
        onClick={() => navigate(-1)}
      >
        <div className="-translate-y-16" onClick={handleNavLinkClick}>
          <img
            src={ChooseMode}
            alt="Choose Mode"
            style={{ width: "42rem", height: "auto" }}
          />
        </div>
        <div className=" z-20 -translate-x-72 translate-y-48 m-0 p-0">
          <NavLink
            to="/QuestionForFun"
            className="inline-block w-52 h-16 text-sm font-avant-garde font-light text-center leading-[4rem] bg-transparent rounded"
            onClick={handleNavLinkClick}
          ></NavLink>
        </div>
      </div>
    </>
  );
}
