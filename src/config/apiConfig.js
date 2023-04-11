import axios from "axios";
import { config } from "./config";
const { env } = import.meta;
const { id } = JSON.parse(localStorage.getItem("userinfo")) || { id: "" };
const BASE_URL = id ? `/api/vendors/${id}/` : `api/`;
const Axios = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  auth: {
    username: config.ADMIN_USERNAME,

    password: config.ADMIN_API_KEY,
  },
});

Axios.interceptors.request.use((configuration) => {
  return configuration;
});
Axios.interceptors.response.use(
  (configuration) => configuration,

  (error) => {
    return Promise.reject(error);
  }
);

export default Axios;
