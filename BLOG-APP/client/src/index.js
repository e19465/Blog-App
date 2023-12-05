import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ContextProvider } from "./context/Context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ContextProvider>
      <Router>
        <Routes>
          <Route path="*" element={<App />} />
        </Routes>
      </Router>
    </ContextProvider>
  </React.StrictMode>
);
