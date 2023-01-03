import axios from "axios";
import { notification } from "antd";

export const apicall2 = async ({
  method = "get",
  preurl = "",
  posturl = "",
  data = {},
  body = "",
  auth = false,
}) => {
  let finalurl = "/api/";

  if (!auth) {
    finalurl =
      finalurl +
      preurl +
      "/" +
      JSON.parse(localStorage.getItem("userinfo"))?.id +
      posturl;
  } else {
    finalurl = finalurl + preurl + posturl;
  }

  try {
    const result = await axios({
      method: method,
      url: finalurl,
      data: data,
      body: body,
      auth: {
        username: import.meta.env.VITE_APP_USERNAME,
        password: import.meta.env.VITE_APP_PASSWORD,
      },
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": true,
      },
    });

    if (method != "get") {
      notification.success({
        message: "Sucessfully Done",
      });
    }

    return result;
  } catch (error) {
    if (method != "get") {
      notification.error({
        message: "Process Fail",
        description: error.message,
      });
    }
    return error.message;
  }
};
