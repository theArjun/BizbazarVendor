import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { DarkModeProvider } from "./context/DarkAndLightMode/DarkAndLightContex";
import { Provider } from "react-redux";
import { store } from "./redux/store";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DarkModeProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </DarkModeProvider>
  </React.StrictMode>
);
