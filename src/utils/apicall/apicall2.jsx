import axios from "axios";
import { notification } from "antd";
import { handleLogout } from "../auth/auth";
import { config } from "../../config/config";
export const apicall2 = async ({
  method = "get",
  preurl = "",
  posturl = "",
  data = {},
  body = "",
  auth = false,
}) => {
  const token = localStorage.getItem("token");
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
        username: config.ADMIN_USERNAME,
        password: config.ADMIN_API_KEY,
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
    if (error?.response?.status === 401) {
      handleLogout();
      notification.error({
        message: "Login required!",
        description:
          "Your session ended please login first to enter into the system",
      });
    }
    if (method != "get") {
      notification.error({
        message: "Process Fail",
        description: error.message,
      });
    }
    return error.message;
  }
};
