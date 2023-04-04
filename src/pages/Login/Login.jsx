import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { Button, Form, Input, Card } from "antd";
import styles from "./Login.module.css";
import "./index.css";
import { apicall } from "./../../utils/apicall/apicall";
import { handlelogin } from "../../utils/auth/auth";

function Login() {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log(values.email, values.password);
    const result = await apicall({
      method: "post",
      auth: true,
      url: "VendorAuthTokens",
      data: {
        email: values.email,

        password: values.password,

        user_type: "V",
      },
    });
    if (result.status === 201) {
      handlelogin(result.data);
      navigate("/");
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className={styles.container}>
      <div className="login_container">
        <Card
          title="Administration panel"
          bordered={false}
          style={{
            width: 300,
          }}
          className={styles.cardTransform}
        >
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
              id="req"
              label="Email:"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input type="email" />
            </Form.Item>

            <Form.Item
              id="req"
              label="Password: "
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                // offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>

          <div
            className={styles.forgetPassword}
            onClick={() => navigate("/resetPassword")}
          >
            Forget Password
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Login;
