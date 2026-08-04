import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { CurrencyProvider } from "./context/CurrencyContext";

import { router } from "./router";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <CurrencyProvider>
        <RouterProvider router={router} />
      </CurrencyProvider>
    </HelmetProvider>
  </React.StrictMode>
);
