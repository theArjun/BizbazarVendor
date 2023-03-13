import React from "react";
import { useParams } from "react-router-dom";
import { Card, Form, Input, Button, Image } from "antd";
import styles from "./AdminMessages.module.css";
import { useState } from "react";
import { useEffect } from "react";
import { getMessageThread } from "../../../apis/MessageCenterApi";
import Spinner from "../../../component/Spinner/Spinner";
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
const AdminMessages = () => {
  const [message, setMessage] = useState(data[0].chat);
  const { id } = useParams();
  const {data:threadData, isLoading:threadLoading}=getMessageThread(id);
  console.log("🚀 ~ file: AdminMessages.jsx:45 ~ AdminMessages ~ threadData:", threadData)
  useEffect(() => {
    let element = document.querySelector("#chat_container");
    const scroll = (el) => {
      el.scroll({ top: el.scrollHeight });
    };
    scroll(element);
  }, [message]);
  const onValueChange = (a, values) => {
    // console.log(values)
  };
  const onFinish = (values) => {
    if (values.message) {
      setMessage([...message, { id: "you", message: values.message }]);
    }
  };
  return (
    <div className={styles.messages}>
      {/* <div className={styles.nav_top}>
      <HiArrowCircleLeft size={40} color="blue" /> <span>{id}</span>
    </div> */}
      <div>
        <div className={styles.main_content}>
          <div className={styles.message_container}>
            <div id="chat_container" className={styles.chat}>
              {message.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={
                      item.id == "user"
                        ? styles.client_message
                        : styles.your_message
                    }
                  >
                    {item.message}
                  </div>
                );
              })}
            </div>
            <div className={styles.write_message_box}>
              <Form
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
                      htmlType="submit"
                      type="default"
                      style={{ borderRadius: "20px" }}
                    >
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
                <Image width={200} src={data[0].image} alt={""} />
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

export default AdminMessages;
