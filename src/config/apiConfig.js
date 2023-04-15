import axios from "axios";
import { config } from "./config";
const Axios = axios.create({
  timeout: 10000,
});

Axios.interceptors.request.use((configuration) => {
  const { id } = JSON.parse(localStorage.getItem("userinfo")) || { id: "" };
  const BASE_URL = id ? `https://dev.bizbazar.com.np/api/vendors/${id}/` : `https://dev.bizbazar.com.np/api/`;
  const token = localStorage.getItem("token");
  configuration.baseURL = BASE_URL;
  configuration.auth = {
    username: token ? token : config.ADMIN_USERNAME,
    password: token ? "" : config.ADMIN_API_KEY,
  };
  return configuration;
});
Axios.interceptors.response.use(
  (configuration) => configuration,

  (error) => {
    return Promise.reject(error);
  }
);

export default Axios;
