import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { Button, Form, Input, Card } from "antd";
import styles from "./Login.module.css";
import "./index.css";
import { handlelogin } from "../../utils/auth/auth";
import { useLogin } from "../../apis/LoginApi";
import { notification } from "antd";
import AgreementModal from "../../component/AgreementModal/AgreementModal";
function Login() {
  const [modalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState({});
  const { mutate, isLoading } = useLogin();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    let data = {
      email: String(values.email).trim(),
      password: String(values.password).trim(),
      user_type: "V",
    };
    mutate(data, {
      onSuccess: (result) => {
        let isFirstLogin = localStorage.getItem("isFirstLogin");
        if (isFirstLogin) {
          handlelogin(result.data);
          notification.success({ message: "Login successful!" });
          navigate("/");
        } else {
          setData(result?.data);
          setModalOpen(true);
        }
      },
    });
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
              <Button type="primary" htmlType="submit" loading={isLoading}>
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
      <AgreementModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        data={data}
      />
    </div>
  );
}

export default Login;
