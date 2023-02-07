import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styles from "./AdditionField.module.css";
import "./index.css";
import {
  Form,
  Input,
  Select,
  Card,
  Upload,
  message,
  Button,
  Modal,
} from "antd";
import { AiOutlineCaretDown, AiOutlineCaretRight } from "react-icons/ai";
import { apicall } from "../../../../utils/apicall/apicall";
import { PlusOutlined } from "@ant-design/icons";
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

let imageCount = 0;
const AdditionField = ({ categories, products, setProducts }) => {
  const [moreOpen, setMoreOpen] = useState(true);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [upload, setUpload] = useState(true);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const [count, setCount] = useState(0);
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
    imageCount = 0;
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

  let insertImage = async (e) => {
    let image_type = e.target.files[0].name.split(".").pop();
    if (image_type === "jpeg" || image_type === "png" || image_type === "jpg") {
      imageCount++;
      let formData = new FormData();
      await formData.append("file[]", e.target.files[0]);
      let result = await apicall({
        method: "post",
        url: "ImageUploads",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": true,
        },
      });
      if (result?.status == 201) {
        if (imageCount <= 1) {
          setUploadedImage({
            ...uploadedImage,
            product_main_image_data: {
              0: {
                detailed_alt: "",
                type: "M",
                object_id: "1",
                position: "0",
                is_new: "Y",
              },
            },
            type_product_main_image_detailed: { 0: "uploaded" },
            file_product_main_image_detailed: {
              0: result?.data?.path,
            },
          });
        } else {
          let temp = { ...uploadedImage };
          temp.product_add_additional_image_data[imageCount - 1] = {
            detailed_alt: "",
            type: "A",
            object_id: "1",
            position: String(imageCount - 1),
            is_new: "Y",
          };
          temp.type_product_add_additional_image_detailed[imageCount - 1] =
            "uploaded";
          temp.file_product_add_additional_image_detailed[imageCount - 1] =
            result?.data?.path;
          setUploadedImage({ ...temp });
        }
      }
    }
  };

  const getCategories = (a) => {
    let temp = {};
    if (a) {
      a?.map((el, i) => {
        temp[i] = el;
      });
    }
    return temp;
  };
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChange = ({ fileList: newFileList }) => {
    if (upload) {
      setFileList(newFileList);
    }
  };
  const beforeUpload = (file) => {
    let file_type = file.name.split(".").pop();
    const isJpgOrPng =
      file_type === "jpeg" || file_type === "png" || file_type === "jpg";
    if (!isJpgOrPng) {
      setUpload(false);
      message.error("You can only upload JPG/PNG file!");
    } else {
      setUpload(true);
    }
    return false;
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
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
            <Form.Item
              label="Images"
              name="image"
              style={{ width: "100%" }}
              onChange={insertImage}
            >
              <Upload
                action="#"
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                beforeUpload={beforeUpload}
              >
                {fileList.length >= 8 ? null : uploadButton}
              </Upload>
              <Modal
                open={previewOpen}
                title={previewTitle}
                footer={null}
                onCancel={handleCancel}
              >
                <img
                  alt="example"
                  style={{
                    width: "100%",
                  }}
                  src={previewImage}
                />
              </Modal>
            </Form.Item>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default AdditionField;
