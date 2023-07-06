import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  Card,
  Form,
  Input,
  Button,
  Image,
  Typography,
  Result,
  Breadcrumb,
} from "antd";
import { useNavigate } from "react-router-dom";
import styles from "./CustomerMessages.module.css";
import { useState } from "react";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useSendAdminMessage } from "../../../apis/MessageCenterApi";
import { getCustomerMessageThread } from "../../../apis/MessageCenterApi";
const { Text } = Typography;
const data = [
  {
    chat: [
      {
        id: "user",
        message: "Hello sir, how are you?",
      },
      {
        id: "user",
        message: "I am looking for a product in your store.",
      },
      {
        id: "you",
        message: "Hi, I am fine",
      },
      {
        id: "you",
        message: "What are you looking for sir?",
      },
    ],
    image:
      "https://www.digitaltrends.com/wp-content/uploads/2021/11/macbook-pro-2021-16.jpg",
    id: "Thread$3",
    message: "Is this product available at your store?",
    customer: "Avinash KC",
    date: "1672831913",
    price: "120000",
    p_name:
      "Winter Beanie Hat Scarf Set Warm Knit Hat Thick Fleece Lined Skull Cap for Men/Womenmj",
    desc: "Importer Details:Rashi Peripherals Pvt. Ltd. Rashi Complex,A Building, Survey186, Dongaripada, Poman Village, Vasai Bhiwandi Road, Dist. Thane,Maharastra 401208, India",
  },
];
const { user_id } = JSON.parse(sessionStorage.getItem("userinfo"));
const CustomerMessages = () => {
  const [message, setMessage] = useState([]);
  const { id } = useParams();
  const {
    data: threadData,
    isLoading: threadLoading,
    error,
    isError,
  } = getCustomerMessageThread(id);
  const { mutate: sendMutate, isLoading: sendLoading } = useSendAdminMessage();
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  useEffect(() => {
    let element = document.querySelector("#chat_container");
    const scroll = (el) => {
      el.scroll({ top: el.scrollHeight });
    };
    scroll(element);
  }, [message]);
  useEffect(() => {
    getMessages();
  }, [threadData]);
  const getMessages = () => {
    if (threadData?.data) {
      setMessage(threadData?.data?.messages);
    }
  };

  const getTimeAndDate = (timeStamp) => {
    const date = new Date(parseInt(timeStamp) * 1000);
    const monthyear = date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });

    const time = date.toLocaleString("en-US", {
      hour: "2-digit",
      minute: "numeric",
    });
    return monthyear + ", " + time;
  };
  const onValueChange = (a, values) => {
    // console.log(values)
  };
  const onFinish = (values) => {
    if (values.message) {
      form.resetFields();
      let MESSAGE_FORMAT = {
        communication_type: "vendor_to_admin",
        message: { thread_id: id, message: values.message },
      };
      sendMutate(MESSAGE_FORMAT, {
        onSuccess: (res) => {
          queryClient.invalidateQueries(["customer_messages", id]);
        },
      });
    }
  };
  if (isError) {
    return (
      <Result
        status={error?.response?.status}
        title={error?.response?.status}
        subTitle={error?.message}
        extra={
          <Button type="primary" onClick={() => navigate("/")}>
            Back Home
          </Button>
        }
      />
    );
  }
  return (
    <div className={styles.messages}>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Message Center</Breadcrumb.Item>
        <Breadcrumb.Item>
          {" "}
          <Link to="/Message Center/Customer Communications">
            {" "}
            Customer Communications
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>thread #{id}</Breadcrumb.Item>
      </Breadcrumb>
      <div>
        <div className={styles.main_content}>
          <div className={styles.message_container}>
            <div id="chat_container" className={styles.chat}>
              {threadLoading ? (
                <div>Loading...</div>
              ) : (
                message?.map((item, index) => {
                  return (
                    <div key={index}>
                      <div
                        className={
                          item.user_id === user_id
                            ? styles.your_message
                            : styles.client_message
                        }
                      >
                        <div>{item.message}</div>
                        <Text type="secondary">
                          {getTimeAndDate(item.timestamp)}
                        </Text>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
            <div className={styles.write_message_box}>
              <Form
                form={form}
                onFinish={onFinish}
                layout="vertical"
                name="basic"
                wrapperCol={{}}
                autoComplete="off"
                onValuesChange={onValueChange}
                initialValues={""}
              >
                <div className={styles.send_box}>
                  <Form.Item name="message" style={{ width: "100%" }}>
                    <Input
                      style={{ fontSize: "16px", borderRadius: "20px" }}
                      placeholder={"Type a message..."}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      loading={sendLoading}
                      htmlType="submit"
                      type="default"
                      style={{ borderRadius: "20px" }}
                    >
                      {" "}
                      <b> Send</b>
                    </Button>
                  </Form.Item>
                </div>
              </Form>
            </div>
          </div>
          <div className={styles.product_container}>
            <div className={styles.product_details}>
              <h3>Product details</h3>
              <div className={styles.image_container}>
                <Image
                  width={200}
                  src={data[0].image}
                  fallback="/image_not_found.png"
                  alt={""}
                />
              </div>
              <p>
                <b>{data[0].p_name}</b>
              </p>
              <p>{data[0].desc}</p>
              <p> रु{data[0].price}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerMessages;
