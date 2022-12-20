import axios from "axios";
import { notification } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { FaRegSadTear } from "react-icons/fa";

const openNotification = (msg1, msg2) => {
  notification.open({
    message: msg1,
    description: msg2,
    icon:
      msg1 === "SuccessFull" ? (
        <SmileOutlined style={{ color: "green" }} />
      ) : (
        <FaRegSadTear style={{ color: "red" }} />
      ),
  });
};

export const apicall = async ({
  method = "get",
  url = "",
  data = {},
  body = "",
  auth = false,
}) => {
  let finalurl = "/api/";

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
        username: import.meta.env.VITE_APP_USERNAME,
        password: import.meta.env.VITE_APP_PASSWORD,
      },
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": true,
      },
    });

    if (method != "get") {
      openNotification("SuccessFull");
    }
    return result;
  } catch (error) {
    if (method != "get") {
      openNotification("Fail", error.message);
    }
    return error.message;
  }
};
