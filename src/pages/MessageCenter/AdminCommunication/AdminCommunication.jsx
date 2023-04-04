import React, { useState } from "react";
import { AdminCommunicationSearch, AdminCommunicationTable } from "../..";
import styles from "./AdminCommunication.module.css";
import { Breadcrumb, Modal, Form, Input, Button } from "antd";
import { HiPlus } from "react-icons/hi";
import { useQueryClient } from "@tanstack/react-query";
import {
  getVendorAdminMessages,
  useCreateAdminMessage,
} from "../../../apis/MessageCenterApi";
import Spinner from "../../../component/Spinner/Spinner";
const { TextArea } = Input;
const { id } = JSON.parse(localStorage.getItem("userinfo"));
const INITIAL_MESSAGE = {
  thread: {
    object_type: "",
    object_id: 0,
    communication_type: "vendor_to_admin",
    subject: "api message",
    companies: {
      0: id,
    },
    message: " ",
  },
};
const INITIAL_PARAMS = {
  time_from: "",
  time_to: "",
};
const AdminCommunication = () => {
  const [open, setOpen] = useState(false);
  const [params, setParams] = useState(INITIAL_PARAMS);
  const { data: adminMessages, isLoading: messageLoading } =
    getVendorAdminMessages(params);
  const { isLoading: sendLoading, mutateAsync: mutateCreate } =
    useCreateAdminMessage();
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    INITIAL_MESSAGE.thread.message = values.message;
    INITIAL_MESSAGE.thread.subject = values.subject;
    mutateCreate(INITIAL_MESSAGE, {
      onSuccess: (res) => {
        queryClient.invalidateQueries(["admin_messages"]);
        hideModal();
        form.resetFields();
      },
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const getAdminMessages = () => {
    if (adminMessages) {
      let message = Object.values(adminMessages?.data?.threads || {});
      return message;
    }
    return [];
  };
  const showModal = () => {
    setOpen(true);
  };
  const hideModal = () => {
    setOpen(false);
  };

  if (sendLoading) {
    return <Spinner />;
  }
  return (
    <div>
      <div className={styles.top_nav}>
        <Breadcrumb>
          <Breadcrumb.Item>Message Center</Breadcrumb.Item>
          <Breadcrumb.Item>Admin Communications</Breadcrumb.Item>
        </Breadcrumb>
        <div onClick={showModal} className={styles.new_add_btn}>
          <HiPlus size={25} />
        </div>
        <Modal
          width={800}
          title="Contact administrator"
          open={open}
          onOk={onFinish}
          onCancel={hideModal}
          okText="Create"
          cancelText="Cancel"
          okButtonProps={{
            style: { display: "none" },
          }}
          cancelButtonProps={{
            style: { display: "none" },
          }}
        >
          <Form
            layout="vertical"
            form={form}
            className={styles.form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              // id="req"
              label="Subject"
              name="subject"
              rules={[
                {
                  required: true,
                  message: "Please enter subject",
                },
              ]}
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              // id="req"
              label="Your message to administrator"
              name="message"
              rules={[
                {
                  required: true,
                  message: "Please enter your message",
                },
              ]}
            >
              <TextArea rows={8} placeholder={"Type a message..."} />
            </Form.Item>

            <Form.Item
              // id="req"
              label=""
            >
              <Button
                type="primary"
                htmlType="submit"
                style={{ float: "right" }}
              >
                Send
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
      <AdminCommunicationSearch setParams={setParams} params={params} />
      <AdminCommunicationTable
        data={getAdminMessages()}
        loading={messageLoading}
      />
    </div>
  );
};

export default AdminCommunication;
