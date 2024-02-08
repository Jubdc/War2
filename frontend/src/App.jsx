import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const [auth, setAuth] = useState();
  const [showNavAndFooter, setShowNavAndFooter] = useState(true); // état pour gérer l'affichage de NavBar et Footer

  return (
    <div className="">
      <ToastContainer />
      {showNavAndFooter && <NavBar auth={auth} setAuth={setAuth} />}
      <Outlet context={{ auth, setAuth, setShowNavAndFooter }} />
      {showNavAndFooter && <Footer />}
    </div>
  );
}

export default App;
