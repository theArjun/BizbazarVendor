import React, { useState } from "react";
import { useMemo } from "react";
import { AdminCommunicationSearch, AdminCommunicationTable } from "../..";
import styles from "./AdminCommunication.module.css";
import { Breadcrumb, Modal, Form, Input, Button, Result } from "antd";
import { HiPlus } from "react-icons/hi";
import { useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
  getVendorAdminMessages,
  useCreateAdminMessage,
} from "../../../apis/MessageCenterApi";
import useDebounce from "../../../utils/Hooks/useDebounce";
const { TextArea } = Input;
const { id } = JSON.parse(sessionStorage.getItem("userinfo"));
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
  const [bottom, setBottom] = useState(false);
  const {
    data: adminMessages,
    isLoading: messageLoading,
    isFetchingNextPage,
    fetchNextPage,
    error,
    isError,
  } = getVendorAdminMessages(params);
  const { isLoading: sendLoading, mutateAsync: mutateCreate } =
    useCreateAdminMessage();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    INITIAL_MESSAGE.thread.message = values.message;
    INITIAL_MESSAGE.thread.subject = values.subject;
    mutateCreate(INITIAL_MESSAGE, {
      onSuccess: (res) => {
        notification.success({ message: "Message sent successfully!" });
        queryClient.invalidateQueries(["admin_messages"]);
        hideModal();
        form.resetFields();
      },
      onError: (err) => {
        notification.error({
          message: "Failed to send message",
          description: err.message,
        });
      },
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  // getting messages
  let getAdminMessages = useMemo(() => {
    let temp = [];
    adminMessages?.pages?.map((el) => {
      Object.values(el?.data?.threads || {})?.map((item) => {
        temp.push(item);
      });
    });
    return temp || [];
  }, [adminMessages]);
  // handle data when the there  is scroll in product table
  const handleScroll = (event) => {
    const condition =
      event.target.scrollTop + event.target.offsetHeight + 100 >
      event.target.scrollHeight;
    setBottom(condition);
  };
  const showModal = () => {
    setOpen(true);
  };
  const hideModal = () => {
    setOpen(false);
  };
  // Handle infinite scroll
  useDebounce(
    () => {
      if (!bottom) {
        return;
      }
      fetchNextPage();
    },
    300,
    [bottom]
  );
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
    <div>
      <div className={styles.top_nav}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/">Home</Link>
          </Breadcrumb.Item>
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
                loading={sendLoading}
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
        handleScroll={handleScroll}
        data={getAdminMessages}
        loading={messageLoading || isFetchingNextPage}
      />
    </div>
  );
};

export default AdminCommunication;
