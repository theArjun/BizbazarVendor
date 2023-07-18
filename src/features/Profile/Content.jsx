import React, { useState } from "react";
import { Form, Select, Button, Input, Checkbox, InputNumber } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import { useUpdateProfile } from "../../apis/ProfileApi";
import styles from "./Content.module.css";
import { useEffect } from "react";
const Content = ({ vendorData, getStates, countries, userInfo, form }) => {
  const { mutate, isLoading: updateLoading } = useUpdateProfile();
  const [billingState, setBillingState] = useState([]);
  const [shippingState, setShippingState] = useState([]);
  const [isShipping, setIsShipping] = useState(false);
  const queryClient = useQueryClient();
  useEffect(() => {
    setBillingStates(vendorData?.b_country || "NP");
    setShippingStates(vendorData?.s_country || "NP");
  }, [vendorData]);
  //Set billing states
  const setBillingStates = (value) => {
    setBillingState([]);
    let temp_states = getStates[value];
    if (temp_states) {
      setBillingState(
        temp_states.map((el, i) => ({ label: el?.state, value: el?.code }))
      );
    }
  };
  //Set billing states
  const setShippingStates = (value) => {
    setShippingState([]);
    let temp_states = getStates[value];
    if (temp_states) {
      setShippingState(
        temp_states.map((el, i) => ({ label: el?.state, value: el?.code }))
      );
    }
  };
  const onFinish = async (values) => {
    const data = {
      user_data: {
        ...values,
        password2: values.c_password,
        company_id: userInfo.id,
      },
      ship_to_another: 1,
      notify_customer: "Y",
      user_id: userInfo.user_id,
      selected_section: "general",
      user_type: "V",
    };
    if (isShipping) {
      data.user_data = {
        ...data.user_data,
        s_address: values.b_address,
        s_city: values.b_city,
        s_country: values.b_country,
        s_state: values.b_state,
        s_zipcode: values.b_zipcode,
      };
    }
    mutate(data, {
      onSuccess: (res) => {
        let temp_data = { ...userInfo };
        temp_data.name = values.firstname + " " + values.lastname;
        temp_data.phone = values.phone;
        sessionStorage.setItem("userinfo", JSON.stringify(temp_data));
        queryClient.invalidateQueries(["profile"]);
      },
    });
  };
  // Phone number validator
  const validatePhoneNumber = (_, value) => {
    const phoneNumberRegex = /^\d{10}$/; // Validates a 10-digit phone number
    if (value && !phoneNumberRegex.test(value)) {
      return Promise.reject("Please enter a valid phone number!");
    }
    return Promise.resolve();
  };
  return (
    <div className={styles.formContainer}>
      <Form
        form={form}
        layout="vertical"
        name="basic"
        onFinish={onFinish}
        autoComplete="off"
        initialValues={{
          ...vendorData,
        }}
      >
        <div className={styles.action_btn}>
          <Form.Item style={{ float: "right" }} name="submit_btn">
            <Button type="primary" htmlType="submit" loading={updateLoading}>
              Save Changes
            </Button>
          </Form.Item>
        </div>
        <div className={styles.information}>
          <div className="information_title">
            <h4 className={styles.title_header}>Account information</h4>
          </div>
          <div className={styles.information_container}>
            <div className={styles.name_container}>
              <Form.Item
                label=" First Name"
                name="firstname"
                style={{
                  width: "100%",
                }}
                rules={[
                  {
                    required: true,
                    message: "Please enter your first name!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                className={styles.left_margin}
                label=" Last Name"
                name="lastname"
                style={{
                  width: "100%",
                }}
                rules={[
                  {
                    required: true,
                    message: "Please enter your name !",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
            <Form.Item
              label="Phone"
              name="phone"
              extra={
                vendorData?.cp_phone_verified === "Y" ? (
                  <span style={{ color: "green" }}>verified</span>
                ) : (
                  <span style={{ color: "red" }}>unverified</span>
                )
              }
              rules={[
                {
                  required: true,
                  message: "Enter a phone number",
                },
                {
                  validator: validatePhoneNumber,
                },
              ]}
            >
              <InputNumber
                type="number"
                min={1}
                style={{ width: "100%" }}
                addonBefore={"+977"}
              />
            </Form.Item>
            <div className={styles.name_container}>
              <Form.Item
                name="password1"
                label="Password"
                style={{
                  width: "100%",
                }}
              >
                <Input.Password autoComplete="off" />
              </Form.Item>
              <Form.Item
                className={styles.left_margin}
                label="Confirm password"
                name="c_password"
                style={{
                  width: "100%",
                }}
              >
                <Input.Password autoComplete="off" />
              </Form.Item>
            </div>
            <Form.Item
              label="Email"
              name="email"
              // style={{ marginTop:'20px'}}
              rules={[
                {
                  required: true,
                  message: "Please enter your email!",
                },
              ]}
            >
              <Input type="email" />
            </Form.Item>
          </div>
        </div>
        <div className={styles.options}>
          <div className="information_title">
            <h4 className={styles.title_header}>Billing address</h4>
          </div>
          <div className={styles.options_container}>
            <Form.Item label="Address" name="b_address">
              <Input type="address" />
            </Form.Item>
            <Form.Item label="Country" name="b_country">
              <Select
                onSelect={setBillingStates}
                showSearch
                options={countries}
              />
            </Form.Item>

            <Form.Item label="State/Province" name="b_state">
              <Select
                //   onChange={onSecondCityChange}
                options={billingState}
              />
            </Form.Item>
            <Form.Item label="City" name="b_city">
              <Input />
            </Form.Item>
            <Form.Item label="Zip/postal code" name="b_zipcode">
              <Input type="text" vlaue="" pattern="\d*" />
            </Form.Item>
          </div>
        </div>
        <div className={styles.pricing}>
          <div className="pricing_title" onClick={() => setPricing(!pricing)}>
            <h4 className={styles.title_header}>Shipping address</h4>{" "}
          </div>
          <Form.Item>
            <Checkbox onChange={() => setIsShipping((prev) => !prev)}>
              Are shipping and billing addresses the same?
            </Checkbox>
          </Form.Item>
          <div className={!isShipping ? "" : styles.area_disabled}>
            <Form.Item
              label="Address"
              name={isShipping ? "b_address" : "s_address"}
            >
              <Input type="address" />
            </Form.Item>
            <Form.Item
              label="Country"
              name={isShipping ? "b_country" : "s_country"}
            >
              <Select
                onSelect={setShippingStates}
                showSearch
                options={countries}
              />
            </Form.Item>

            <Form.Item
              label="State/Province"
              name={isShipping ? "b_state" : "s_state"}
            >
              <Select
                //   onChange={onSecondCityChange}
                options={isShipping ? billingState : shippingState}
              />
            </Form.Item>
            <Form.Item label="City" name={isShipping ? "b_city" : "s_city"}>
              <Input />
            </Form.Item>
            <Form.Item
              label="Zip/postal code"
              name={isShipping ? "b_zipcode" : "s_zipcode"}
            >
              <Input type="text" pattern="\d*" />
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default Content;
