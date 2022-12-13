import React from "react";
import styles from "./AddProduct.module.css";
import {
  Breadcrumb,
  Button,
  Form,
  Input,
  Select,
  message,
  Upload,
  Checkbox,
  notification
} from "antd";
import { AiFillCaretRight, AiFillCaretDown } from "react-icons/ai";
import { InboxOutlined } from "@ant-design/icons";
import { apicall } from "../../../utils/apicall/apicall";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
const { Dragger } = Upload;
let cat_ids=[];
const AddProduct = () => {
  // for toggling  fields button
  const [info, setInfo] = useState(true);
  const [options, setOptions] = useState(true);
  const [pricing, setPricing] = useState(true);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState([]);
  const [description, setDescription] = useState("");
  const [vat, setVat] = useState(false);
  const [api, contextHolder] = notification.useNotification();
 // This is used to alert user for any <information></information>
 const openNotificationWithIcon = (type,message) => {
  api[type]({
    message: message,
    placement:'bottomRight'
  });
};
  const options_type = [
    { label: "Simultaneous", value: "P" },
    { label: "Sequential", value: "S" },
  ];
  const exception_type = [
    { label: "Forbidden", value: "F" },
    { label: "Allowed", value: "A" },
  ];
  const price_action = [
    { label: "Do not allow customers to add the product to cart", value: "R" },
    { label: "Allow customers to add the product to cart", value: "P" },
    { label: "Ask customer to enter the price", value: "A" },
  ];
  const track_inventory = [
    { label: "Yes", value: "Y" },
    { label: "No", value: "N" },
  ];

  // trigger while clicking  on create button if there is no any error at  client side
  const onFinish = (values) => {
   
    console.log(values)
    const product_data = {
      product: values.name,
      category_ids: categoryId,
      price: values.price,
      options_type: values.options,
      exceptions_type: values.exceptions,
      product_code: values.code,
      min_qty: values.min_qty,
      full_description:values.description,
      max_qty: values.max_qty,
      zero_price_action: values.price_action,
      amount: values.stock,
      tracking: values.track_inventory,
      tax: vat ? "Y" : "N",
    };
    // console.log(product_data);
    const timeOutId = setTimeout(async () => {
      // perform api call to retrieve data
      const result = await apicall({
        method: "post",
        url: `vendors/62/products`,
        data: { ...product_data },
      });
      if(result.data){
        // Seccess message
        openNotificationWithIcon('success','Product create successfully!');
      }
      else{
        openNotificationWithIcon('error','Failed to create  product!');

      }
    }, 500);
    return () => clearTimeout(timeOutId);
  };
// throw message while error occured at client side
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  // This function is used to retrieve categories from database
  const retrieveCategories = async () => {
    const category = [];
    // perform api call to retrieve data
    const result = await apicall({
      url: `vendors/62/categories`,
    });
    await result.data.categories.map((item, index) => {
      category.push({
        value: item.category,
        label: item.category,
        id: item.category_id,
      });
    });
    setCategories(category);
  };
  //  run code while selecting categories
  const onSelect = (value) => {
    categories.map((item, index) => {
      if (value == item.label) {
        cat_ids.push(item.id);
        setCategoryId(cat_ids)
      }
    });
  };
  //  run code while Deselecting categories
  const onDeselect=(value)=>{
    categories.map((item, index) => {
      if (value == item.label) {
        categoryId.pop(item.id)
      }
    });
  }
  // this function is for category search
  const onSearch = (value) => {
    console.log("search:", value);
  };
  // this  is for upload image options
  const props = {
    name: "file",
    multiple: true,
    action: "/images/detailed/9",
    onChange(info) {
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
    <div className={styles.container}>
    {contextHolder}
      <div className={styles.breadcrumb_create_btn}>
        <div className="breadcrumb">
          <Breadcrumb>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="">Products</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="">Products</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Add Products</Breadcrumb.Item>
          </Breadcrumb>
        </div>
       
      </div>
      <div className={styles.formContainer}>
        <Form
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          initialValues={{
            track_inventory: "Y",
            available_qty: 1,
            exceptions: "F",
            max_qty: 1,
            min_qty: 1,
            options: "P",
            price_action: "R",
            stock: 1,
            tax: "N",
          }}
        >
        <Form.Item
        style={{float:'right'}}
        >
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Item>
          <div className={styles.information}>
            <div className="information_title" onClick={() => setInfo(!info)}>
              <h2 className={styles.title_header}>
                Information{!info ? <AiFillCaretRight /> : <AiFillCaretDown />}
              </h2>
            </div>
            <div
              className={
                info ? styles.information_container : styles.close_container
              }
            >
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please enter product name!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                id="category"
                label="Categories"
                rules={[
                  {
                    required: true,
                    message: "Select your product category!",
                  },
                ]}
                name="category"
              >
                <Select
                  onClick={() => retrieveCategories()}
                  showSearch
                  mode="tags"
                  placeholder="Select a category"
                  optionFilterProp="children"
                  onSelect={onSelect}
                  onSearch={onSearch}
                  onDeselect={onDeselect}
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={categories}
                />
              </Form.Item>
              <Form.Item
                label="Price (रु)"
                name="price"
                style={{ width: 300 }}
                rules={[
                  {
                    required: true,
                    message: "Please  enter product price!",
                  },
                ]}
              >
                <Input type="number" />
              </Form.Item>
              <Form.Item
                label="Full description"
                name="description"
                rules={[
                  {
                    required: true,
                    message: "Description is required!",
                  },
                ]}
              >
                <ReactQuill
                  theme="snow"
                  value={description}
                  onChange={setDescription}
                />
              </Form.Item>
              <Form.Item label="Images" name="image">
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
          </div>
          <div className={styles.options}>
            <div
              className="information_title"
              onClick={() => setOptions(!options)}
            >
              <h2 className={styles.title_header}>
                Options setting
                {!options ? <AiFillCaretRight /> : <AiFillCaretDown />}
              </h2>
            </div>
            <div
              className={
                options ? styles.options_container : styles.close_container
              }
            >
              <Form.Item label="Options type" name="options">
                <Select
                  style={{
                    width: 300,
                  }}
                  options={options_type.map((option) => ({
                    label: option.label,
                    value: option.value,
                  }))}
                />
              </Form.Item>

              <Form.Item label="Exceptions type" name="exceptions">
                <Select
                  style={{
                    width: 300,
                  }}
                  //   onChange={onSecondCityChange}
                  options={exception_type.map((exception) => ({
                    label: exception.label,
                    value: exception.value,
                  }))}
                />
              </Form.Item>
            </div>
          </div>
          <div className={styles.pricing}>
            <div className="pricing_title" onClick={() => setPricing(!pricing)}>
              <h2 className={styles.title_header}>
                Pricing/ inventory
                {!pricing ? <AiFillCaretRight /> : <AiFillCaretDown />}
              </h2>{" "}
            </div>
            <div
              className={
                pricing ? styles.pricing_container : styles.close_container
              }
            >
              <Form.Item label="CODE" name="code">
                <Input type="text" />
              </Form.Item>
              <Form.Item label="In stock" name="stock" style={{ width: 200 }}>
                <Input type="number" />
              </Form.Item>

              <Form.Item label="Zero price action" name="price_action">
                <Select
                  //   onChange={onSecondCityChange}
                  options={price_action.map((price_action) => ({
                    label: price_action.label,
                    value: price_action.value,
                  }))}
                />
              </Form.Item>
              <Form.Item label="Track inventory" name="track_inventory">
                <Select
                  style={{
                    width: 300,
                  }}
                  options={track_inventory.map((track) => ({
                    label: track.label,
                    value: track.value,
                  }))}
                />
                <p>
                  When inventory is tracked, the number of products in stock
                  will decrease after each purchase.
                </p>
              </Form.Item>
              <Form.Item
                label="Minimum quantity to buy per product"
                name="min_qty"
                style={{
                  width: 400,
                }}
              >
                <Input type="number" />
              </Form.Item>
              <Form.Item
                label="Maximum quantity to buy per product"
                name="max_qty"
                style={{
                  width: 400,
                }}
              >
                <Input type="number" />
              </Form.Item>
              <Form.Item
                label="No of available quantities"
                name="available_qty"
                style={{
                  width: 400,
                }}
              >
                <Input type="number" />
              </Form.Item>
              <Form.Item label="Taxes" valuePropName="yes" name="tax">
                <Checkbox onChange={() => setVat(!vat)}>VAT</Checkbox>
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddProduct;
