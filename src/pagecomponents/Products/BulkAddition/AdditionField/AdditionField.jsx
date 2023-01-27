import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styles from "./AdditionField.module.css";
import { Form, Input, Select, Card, Upload,message, Button } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { AiOutlineCaretDown, AiOutlineCaretRight } from "react-icons/ai";
import { useEffect } from "react";
const { Dragger } = Upload;
const AdditionField = ({ categories, products, setProducts }) => {
  const [moreOpen, setMoreOpen] = useState(false);
  const [count, setCount] = useState(0);
  const [formData, setFormData]=useState(new FormData())
  let cats = categories.map((item) => ({
    label: item.category,
    value: item.category_id,
  }));
  const onFinish = (values) => {
    
    setProducts([...products, { ...values, key: count }]);
    setCount(count + 1);
  };
  // throw message while error occured at client side
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const status_items = [
    {
      label: "Active",
      value: "A",
    },
    {
      label: "Disabled",
      value: "D",
    },
    {
      label: "Hidden",
      value: "H",
    },
  ];
  const props = {
    name: "file",
    multiple: true,
    action: "/",
    onChange(info) {
      console.log(info)
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };
  return (
    <div>
      <Card>
        <Form
          layout="vertical"
          className={styles.form}
          name="basic"
          wrapperCol={{}}
          autoComplete="off"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={{
            status: "A",
          }}
        >
          <div className={styles.search_inputs}>
            <Form.Item
              label="Category"
              name="category"
              rules={[
                {
                  required: true,
                  message: "The Field is Mandatory",
                },
              ]}
            >
              <Select
                showSearch
                placeholder="Select a category"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={cats}
              />
            </Form.Item>
            <Form.Item
              id="req"
              label="Product name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "The Field is Mandatory",
                },
              ]}
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              label="Code"
              name="code"
              style={{ width: "80px" }}
              rules={[
                {
                  required: true,
                  message: "The Field is Mandatory",
                },
              ]}
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              label="Price"
              name="price"
              style={{ width: "80px" }}
              rules={[
                {
                  required: true,
                  message: "The Field is Mandatory",
                },
              ]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item
              label="List price"
              name="list_price"
              style={{ width: "80px" }}
              rules={[
                {
                  required: true,
                  message: "The Field is Mandatory",
                },
              ]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item
              label="In stock"
              name="stock"
              style={{ width: "80px" }}
              rules={[
                {
                  required: true,
                  message: "The Field is Mandatory",
                },
              ]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item label="Status" name="status" style={{ width: "150px" }}>
              <Select
                showArrow
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={status_items}
              />
            </Form.Item>
            <Form.Item label="More" name="more">
              {!moreOpen ? (
                <AiOutlineCaretRight
                  color={"#7367f0"}
                  className={styles.more_btn}
                  onClick={() => setMoreOpen(!moreOpen)}
                />
              ) : (
                <AiOutlineCaretDown
                  color={"#7367f0"}
                  className={styles.more_btn}
                  onClick={() => setMoreOpen(!moreOpen)}
                />
              )}
            </Form.Item>
            <div className={styles.action_buttons}>
              <Form.Item name="add">
                <Button
                  type="primary"
                  style={{ marginTop: "25px" }}
                  htmlType="submit"
                >
                  Add
                </Button>
              </Form.Item>
            </div>
          </div>
          <div
            className={
              moreOpen ? styles.image_and_desc : styles.image_and_desc_close
            }
          >
            <Form.Item
              style={{ width: "100%" }}
              label="Full description"
              name="description"
            >
              <ReactQuill theme="snow" />
            </Form.Item>
            <Form.Item label="Images" name="image" style={{ width: "100%" }} >
              <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
              </Dragger>
            </Form.Item>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default AdditionField;
