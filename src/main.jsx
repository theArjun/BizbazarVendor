import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ConfigProvider } from "antd";
import { DarkModeProvider } from "./context/DarkAndLightMode/DarkAndLightContex";
import { Provider } from "react-redux";
import { store } from "./redux/store";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DarkModeProvider>
      <Provider store={store}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#9b78ec",
            },
          }}
        >
          <App />
        </ConfigProvider>
      </Provider>
    </DarkModeProvider>
  </React.StrictMode>
);
