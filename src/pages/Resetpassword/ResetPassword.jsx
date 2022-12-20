import React from "react";
import styles from "./Resetpassword.module.css";
import { useContext, useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { Button, Form, Input, Card } from "antd";

import "./style.css";

function ResetPassword() {
  const navigate = useNavigate();

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    localStorage.setItem("login", true);
    navigate("/");
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className={styles.container}>
      <Card
        title="Reset password"
        bordered={false}
        style={{
          width: 500,
        }}
        className={styles.cardTransform}
      >
        <div className={styles.text}>
          Enter your email address to receive a new login key and a link to sign
          in and change your password.
        </div>
        <Form
          layout="vertical"
          form={form}
          className={styles.form}
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{}}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            id="emailfp"
            label="Email:"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input type="email" />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Reset Password{" "}
            </Button>
          </Form.Item>
        </Form>
        <div className={styles.goback} onClick={() => navigate("/login")}>
          Back
        </div>
      </Card>
    </div>
  );
}

export default ResetPassword;
