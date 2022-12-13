import axios from "axios";

export const apicall = async ({ method = "get", url = "", data = {}, body='' }) => {
  try {
    const result = axios({
      method: method,
      url: "/api/" + url,
      data: data,
      body:body,
      auth: {
        username: import.meta.env.VITE_APP_USERNAME,
        password: import.meta.env.VITE_APP_PASSWORD,
      },
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": true,
      },
    });
    return result;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};
