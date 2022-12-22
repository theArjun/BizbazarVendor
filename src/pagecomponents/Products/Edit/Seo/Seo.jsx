import React from "react";
import styles from "./Seo.module.css";
import { Form, Button, Input, Card } from "antd";
import TextArea from "antd/es/input/TextArea";
const Seo = () => {
  const value = "https://";
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onValueChange = (a, b) => {
    console.log(b);
  };
  return (
    <div className={styles.seo}>
      <Form
        name="basic"
        initialValues={{
          weight: "0.000",
          freight: "0.00",
          min_items: "0",
          max_items: "0",
          box_width: "0",
          box_length: "0",
          box_height: "0",
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        onValuesChange={onValueChange}
      >
        <Form.Item style={{ float: "right" }}>
          <Button type="primary" htmlType="submit">
            Save changes
          </Button>
        </Form.Item>
        <br />
        <br />
        <Card>
        <div className={styles.seo_card}>
        <div  className={styles.seo_card_left}>
          <h3>SEO</h3>
          <Form.Item name="seo_name" label="SEO name">
            <Input addonBefore={value} />
          </Form.Item>
          <h3>Meta data </h3>
          <Form.Item name="page_title" label="Page title">
            <Input />
          </Form.Item>
          <Form.Item name="meta_description" label="Meta Description">
            <TextArea />
          </Form.Item>
          <Form.Item name="meta_keywords" label="Meta keywords">
            <TextArea />
          </Form.Item>
          </div>
          <div className={styles.seo_card_right}>
          <h3>Google rich snippets preview</h3>
          </div>
          </div>
        </Card>
      </Form>
    </div>
  );
};

export default Seo;
