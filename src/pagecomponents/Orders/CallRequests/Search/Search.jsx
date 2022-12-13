import React from "react";
import styles from "./Search.module.css";
import { Card, Form, Input, Button } from "antd";
const Search = ({ setSearchValue }) => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log("Success:", values);
    // console.log(getAllOrders())
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onvaluechange = (b, a) => {
    setSearchValue(a);
  };

  return (
    <div className={styles.container}>
      <Card bordered={true}>
        <Form
          layout="vertical"
          form={form}
          className={styles.form}
          name="basic"
          onValuesChange={onvaluechange}
          wrapperCol={{}}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div className={styles.search_inputs}>
            <Form.Item id="id" label="ID" name="id">
              <Input type="text" />
            </Form.Item>
            <Form.Item id="name" label="Name" name="name">
              <Input type="name" />
            </Form.Item>
            <Form.Item id="phone" label="Phone" name="phone">
              <Input type="tel" />
            </Form.Item>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Search;
