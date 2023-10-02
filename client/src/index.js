import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";

// Routeların çalışması için <App /> öğesini düzenlemeniz gerekir
import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <App />
  </Router>
);
