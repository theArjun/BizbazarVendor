import React, { useEffect, useState, forwardRef } from "react";
import styles from "./Search.module.css";
import { Card, Form, Input, Button } from "antd";

const ViewOrderSearch = ({ setSearchValue = {} }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {};
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onvaluechange = (a, values) => {
    setSearchValue(values);
  };

  return (
    <div className={styles.container}>
      <Card bordered={true}>
        <Form
          layout="vertical"
          form={form}
          className={styles.form}
          name="basic"
          wrapperCol={{}}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          onValuesChange={onvaluechange}
          autoComplete="off"
        >
          <div className={styles.search_inputs}>
            <Form.Item id="customer" label="Customer" name="customer">
              <Input type="text" />
            </Form.Item>
            <Form.Item id="email" label="E-mail" name="email">
              <Input type="text" />
            </Form.Item>
            <Form.Item id="phone" label="Phone" name="phone">
              <Input type="tel" />
            </Form.Item>
            <Form.Item id="orderid" label="Order Id" name="orderid">
              <Input type="tel" />
            </Form.Item>

            <div>
              <label>Total (रु)</label>
              <div className={styles.price_container}>
                <Form.Item
                  id="min-price"
                  name="min_price"
                  style={{ width: "80px" }}
                >
                  <Input type="number" />
                </Form.Item>{" "}
                <Form.Item>-</Form.Item>
                <Form.Item
                  id="max-price"
                  name="max_price"
                  style={{ width: "80px" }}
                >
                  <Input type="number" />
                </Form.Item>
              </div>
            </div>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default ViewOrderSearch;
