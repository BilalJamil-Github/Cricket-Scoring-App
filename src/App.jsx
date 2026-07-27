import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import Teams from "./pages/Teams/Teams";
import Toss from "./pages/Toss/Toss";
import Intro from "./pages/Intro/Intro";
import Matchconsole from "./pages/MatchConsole/Matchconsole";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useLocation } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Intro></Intro>,
    },
    {
      path: "/teams",
      element: <Teams></Teams>,
    },
    {
      path: "/toss",
      element: <Toss></Toss>,
    },
    {
      path: "/match-console",
      element: <Matchconsole></Matchconsole>,
    },
  ]);

  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  );
}

export default App;
