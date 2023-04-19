import axios from "axios";
import { config } from "./config";
import { handleLogout } from "../utils/auth/auth";
import { notification } from "antd";
const Axios = axios.create({
  timeout: 10000,
});

Axios.interceptors.request.use((configuration) => {
  const { id } = JSON.parse(localStorage.getItem("userinfo")) || { id: "" };
  const BASE_URL = id ? `/api/vendors/${id}/` : `/api/`;
  const token = localStorage.getItem("token");
  configuration.baseURL = BASE_URL;
  configuration.auth = {
    // username: token ? token : config.ADMIN_USERNAME,
    // password: token ? "" : config.ADMIN_API_KEY,
    username: config.ADMIN_USERNAME,
    password: config.ADMIN_API_KEY,
  };
  return configuration;
});
Axios.interceptors.response.use(
  (configuration) => configuration,

  (error) => {
    if (error?.response?.status === 401) {
      handleLogout();
      notification.error({
        message: "Login required!",
        description:
          "Your session ended please login first to enter into the system",
      });
    }
    return Promise.reject(error);
  }
);

export default Axios;
