import axios from "axios";
import { notification } from "antd";
import { handleLogout } from "../auth/auth";
import { config } from "../../config/config";
const token = localStorage.getItem("token");
export const apicall = async ({
  method = "get",
  url = "",
  data = {},
  body = "",
  auth = false,
  headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": true,
  },
}) => {
  let finalurl = "https://dev.bizbazar.com.np/api/";
  if (!auth) {
    finalurl =
      finalurl +
      "vendors/" +
      JSON.parse(localStorage.getItem("userinfo"))?.id +
      "/";
  }
  try {
    const result = await axios({
      method: method,
      url: finalurl + url,
      data: data,
      body: body,
      auth: {
        username: token ? token : config.ADMIN_USERNAME,
        password: token ? "" : config.ADMIN_API_KEY,
      },
      headers: headers,
    });
    if (method != "get") {
      if (result?.data?.result?.product_ids == "No new products were created") {
        notification.error({
          message: result?.data?.result?.product_ids,
        });
      } else {
        notification.success({
          message: "Sucessfully Done",
        });
      }
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
    if (error?.response?.status === 403) {
      notification.error({
        message: "Process Fail",
        description:
          "Error code: 403-> You do not have permission to access this resource",
      });
    }
    if (method != "get") {
      notification.error({
        message: "Process Fail",
        description: error.message,
      });
    }
    return error.response.status;
  }
};
