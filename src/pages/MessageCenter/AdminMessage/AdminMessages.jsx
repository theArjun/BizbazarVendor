import React from "react";
import { useParams } from "react-router-dom";
import { Form, Input, Button, Typography, Result } from "antd";
import styles from "./AdminMessages.module.css";
import { useState } from "react";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  getMessageThread,
  useSendAdminMessage,
} from "../../../apis/MessageCenterApi";
const {Text}=Typography
const { user_id } = JSON.parse(localStorage.getItem("userinfo"));
const AdminMessages = () => {
  const [message, setMessage] = useState([]);
  const [status, setStatus] = useState('');
  const { id } = useParams();
  const { data: threadData, isLoading: threadLoading } = getMessageThread(id);
  const { mutate: sendMutate, isLoading: sendLoading } = useSendAdminMessage();
  const [form]=Form.useForm()
  const queryClient=useQueryClient()
  useEffect(() => {
    getMessages();
  }, [threadData]);
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
  const getMessages = () => {
    if(threadData===404){
      setStatus(threadData)
    }
    setMessage(threadData?.data?.messages);
  };
  useEffect(() => {
    let element = document.querySelector("#chat_container");
    const scroll = (el) => {
      el.scroll({ top: el.scrollHeight });
    };
    scroll(element);
  }, [message]);
  const onFinish = (values) => {
    if (values.message) {
      form.resetFields()
      let MESSAGE_FORMAT = {
        communication_type: "vendor_to_admin",
        message: { thread_id: id, message: values.message },
      };
      sendMutate(MESSAGE_FORMAT,{
        onSuccess:(res)=>{
          queryClient.invalidateQueries(['admin_messages', id])
        
        }
      });
    }
  };
  if(status){
       return (
        <Result
          status="404"
          title="404"
          subTitle="Sorry, Requested message thread does not found !"
          extra={<a href="/">Back Home</a>}
        />
      );
  }
  return (
    <div className={styles.messages}>
      <div>
        <div className={styles.main_content}>
          <div className={styles.message_container}>
            <div id="chat_container" className={styles.chat}>
              {threadLoading ? (
                <div>Loading...</div>
              ) : (
                message?.map((item, index) => {
                  return (
                    <div  key={index}>
                    <div
                      className={
                        item.user_id === user_id
                          ? styles.your_message
                          : styles.client_message
                      }
                    >
                    <div>
                    {item.message}
                    
                    </div>
                    <Text type="secondary">{getTimeAndDate(item.timestamp)}</Text>
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
                      <b> Send</b>
                    </Button>
                  </Form.Item>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMessages;
