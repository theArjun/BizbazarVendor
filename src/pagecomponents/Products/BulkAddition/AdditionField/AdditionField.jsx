import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styles from "./AdditionField.module.css";
import "./index.css";
import { Form, Input, Select, Card, message, Button } from "antd";
import { AiOutlineCaretDown, AiOutlineCaretRight } from "react-icons/ai";
import ImageUploader from "../../../../component/ImageUploader/ImageUploader";

const AdditionField = ({ categories, products, setProducts }) => {
  const [moreOpen, setMoreOpen] = useState(true);
  const [count, setCount] = useState(0);
  const [imageCount, setImageCount] = useState(0);
  const [uploadedImage, setUploadedImage] = useState({
    product_main_image_data: {},
    type_product_main_image_detailed: {},
    file_product_main_image_detailed: {},
    product_add_additional_image_data: {},
    type_product_add_additional_image_detailed: {},
    file_product_add_additional_image_detailed: {},
  });
  let cats = categories.map((item) => ({
    label: item.category,
    value: item.category_id,
  }));
  const onFinish = (values) => {
    setProducts([
      ...products,
      {
        ...values,
        ...uploadedImage,
        key: count,
        category_ids: getCategories(values.category),
      },
    ]);
    setCount(count + 1);
    setImageCount(0);
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
  const getCategories=(a)=>{
    let temp={}
      if(a){
       a?.map((el, i)=>{
        temp[i]=el
       })
      }
      return temp
  }
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
              style={{ width: "150px" }}
              rules={[
                {
                  required: true,
                  message: "The Field is Mandatory",
                },
              ]}
            >
              <Select
                showSearch
                mode="tags"
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
              name="product"
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
              name="product_code"
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
              name="amount"
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
            <Form.Item label="More">
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
              <Form.Item>
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
              name="full_description"
              rules={[
                {
                  required: true,
                  message: "The Field is Mandatory",
                },
              ]}
            >
              <ReactQuill theme="snow" />
            </Form.Item>
            <div></div>
            <ImageUploader
              message={message}
              uploadedImage={uploadedImage}
              setUploadedImage={setUploadedImage}
              imageCount={imageCount}
              setImageCount={setImageCount}
              Form={Form}
            />
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default AdditionField;
