import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
import { ProvedorLoja } from "./Loja";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ProvedorLoja>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </ProvedorLoja>
  </React.StrictMode>
);
