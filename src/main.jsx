import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// import App from "../Test";

import "./index.css";
import { ConfigProvider } from "antd";
import { DarkModeProvider } from "./context/DarkAndLightMode/DarkAndLightContex";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DarkModeProvider>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#9b78ec",
          },
        }}
      >
        <App />
      </ConfigProvider>
    </DarkModeProvider>
  </React.StrictMode>
);
