import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import InfoContextProvider from "./context/InfoContext";
import "boxicons";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <InfoContextProvider>
      <App />
    </InfoContextProvider>
  </BrowserRouter>
);
