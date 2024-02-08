import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import FilmPage from "./pages/FilmPage";
import RegisterPage from "./pages/RegisterPage";
import Login from "./pages/LogInPage";
import HomePage from "./pages/HomePage";
import DirectorsPage from "./pages/DirectorsPage";
import MyHollywood from "./pages/MyHollywood";
import AwardsRoom from "./pages/AwardsRoom";
import QuestionForFun from "./pages/PlayForFun";
import RankingBoard from "./pages/RankingPage";
import CineWarRanking from "./pages/CineWarRanking";
import God from "./components/Timer/God";
import NotFoundPage from "./pages/NotFoundPage";
import ChooseAndPlay from "./pages/ChooseMode";

const router = createBrowserRouter([
  {
    element: <App />,

    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/Choose",
        element: <ChooseAndPlay />,
      },
      {
        path: "/MyHollywood",
        element: <MyHollywood />,
      },
      {
        path: "/GodPage",
        element: <God />,
      },
      {
        path: "/QuestionForFun",
        element: <QuestionForFun />,
      },
      {
        path: "/CineWarRanking",
        element: <CineWarRanking />,
      },
      {
        path: "/Ranking",
        element: <RankingBoard />,
      },
      {
        path: "/awardsRoom",
        element: <AwardsRoom />,
      },
      {
        path: "/film",
        element: <FilmPage />,
      },
      {
        path: "/directors",
        element: <DirectorsPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
