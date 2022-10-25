import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import { HeroesApp } from "./HeroesApp";
import "animate.css";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <HeroesApp />
    </Router>
  </React.StrictMode>
);
