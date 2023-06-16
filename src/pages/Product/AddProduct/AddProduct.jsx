import React, { useMemo } from "react";
import styles from "./AddProduct.module.css";
import "./index.css";
import {
  Breadcrumb,
  Button,
  Form,
  Input,
  Select,
  message,
  Checkbox,
  Card,
} from "antd";
import { AiFillCaretRight, AiFillCaretDown } from "react-icons/ai";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ImageUploader from "../../../component/ImageUploader/ImageUploader";
import { useAddProduct } from "../../../apis/ProductApi";
import Spinner from "../../../component/Spinner/Spinner";
import { useGetCategories } from "../../../apis/CategoryApi";
import { useGetTaxes } from "../../../apis/TaxApi";
const AddProduct = () => {
  const navigate = useNavigate();
  // for toggling  fields button
  const [info, setInfo] = useState(true);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState(true);
  const [pricing, setPricing] = useState(true);
  const [description, setDescription] = useState("");
  const [taxChecked, setTaxChecked] = useState(false);
  const [vatId, setVatId] = useState([]);
  const [imageCount, setImageCount] = useState(0);
  const { isLoading, mutate, isError } = useAddProduct();
  const { data: categoryData, isLoading: categoryLoading } = useGetCategories();
  const { data: taxData } = useGetTaxes();
  const [uploadedImage, setUploadedImage] = useState({
    product_main_image_data: {},
    type_product_main_image_detailed: {},
    file_product_main_image_detailed: {},
    product_add_additional_image_data: {},
    type_product_add_additional_image_detailed: {},
    file_product_add_additional_image_detailed: {},
  });
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
    { label: "Yes", value: "B" },
    { label: "No", value: "D" },
  ];
  // Getting categories
  const getCategories = useMemo(() => {
    let cats = categoryData?.data?.categories?.map((item, index) => ({
      label: item.category,
      value: item.category_id,
      id: item.category_id,
    }));
    return cats || [];
  }, [categoryData]);
  useEffect(() => {
    if (taxChecked) {
      getTax();
    } else {
      setVatId([]);
    }
  }, [taxChecked]);
  const prepareCategory = (ids) => {
    let temp = {};
    if (ids) {
      ids?.map((el, i) => {
        temp[i] = el;
      });
    }
    return temp;
  };
  // trigger while clicking  on create button if there is no any error at  client side
  const onFinish = async (values) => {
    const product_data = {
      products_data: [
        {
          ...values,
          category_ids: prepareCategory(values.category),
          tax_ids: vatId,
          ...uploadedImage,
        },
      ],
    };
    mutate(product_data, {
      onSuccess: (response) => {
        navigate("../products");
      },
      onError: (error) => {
        console.log(error, "adding-product-error");
      },
    });
  };
  // throw message while error occured at client side
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  // this function is for category search
  const onSearch = (value) => {
    console.log("search:", value);
  };
  // get Tax  and set value to the state
  const getTax = async () => {
    if (taxData?.data) {
      let tax = taxData?.data?.taxes?.filter((item) => {
        return item.tax === "VAT";
      });
      setVatId([...tax[0].tax_id]);
    }
  };
  if (isLoading || categoryLoading) return <Spinner />;

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumb_create_btn}>
        <div className="breadcrumb">
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/">Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/Products">Products</Link>
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
            tracking: "B",
            available_qty: 1,
            exceptions_type: "F",
            max_qty: 1,
            min_qty: 1,
            options_type: "P",
            zero_price_action: "R",
            stock: 1,
            amount: 1,
          }}
        >
          <Form.Item style={{ float: "right" }}>
            <Button disabled={loading} type="primary" htmlType="submit">
              Create
            </Button>
          </Form.Item>
          <div className={styles.information}>
            <div className="information_title" onClick={() => setInfo(!info)}>
              <h2 className={styles.title_header}>
                Information{!info ? <AiFillCaretRight /> : <AiFillCaretDown />}
              </h2>
            </div>
            <Card
              className={
                info ? styles.information_container : styles.close_container
              }
            >
              <Form.Item
                label="Name"
                name="product"
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
                  showSearch
                  mode="tags"
                  placeholder="Select a category"
                  optionFilterProp="children"
                  onSearch={onSearch}
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={getCategories}
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
                label="List price (रु)"
                name="list_price"
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
                name="full_description"
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
              <ImageUploader
                message={message}
                uploadedImage={uploadedImage}
                setUploadedImage={setUploadedImage}
                imageCount={imageCount}
                setImageCount={setImageCount}
                Form={Form}
                setLoading={setLoading}
              />
            </Card>
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
            <Card
              className={
                options ? styles.options_container : styles.close_container
              }
            >
              <Form.Item label="Options type" name="options_type">
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

              <Form.Item label="Exceptions type" name="exceptions_type">
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
            </Card>
          </div>
          <div className={styles.pricing}>
            <div className="pricing_title" onClick={() => setPricing(!pricing)}>
              <h2 className={styles.title_header}>
                Pricing/ inventory
                {!pricing ? <AiFillCaretRight /> : <AiFillCaretDown />}
              </h2>{" "}
            </div>
            <Card
              className={
                pricing ? styles.pricing_container : styles.close_container
              }
            >
              <Form.Item
                label="CODE"
                name="product_code"
                rules={[
                  {
                    required: true,
                    message: "Please enter product name!",
                  },
                ]}
              >
                <Input type="text" />
              </Form.Item>
              <Form.Item label="In stock" name="amount" style={{ width: 200 }}>
                <Input type="number" />
              </Form.Item>

              <Form.Item label="Zero price action" name="zero_price_action">
                <Select
                  //   onChange={onSecondCityChange}
                  options={price_action.map((price_action) => ({
                    label: price_action.label,
                    value: price_action.value,
                  }))}
                />
              </Form.Item>
              <Form.Item
                label="Track inventory"
                name="tracking"
                extra="When inventory is tracked, the number of products in stock
              will decrease after each purchase."
              >
                <Select
                  style={{
                    width: 300,
                  }}
                  options={track_inventory.map((track) => ({
                    label: track.label,
                    value: track.value,
                  }))}
                />
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
                <Checkbox
                  checked={taxChecked}
                  onChange={(e) => setTaxChecked(e.target.checked)}
                >
                  VAT
                </Checkbox>
              </Form.Item>
            </Card>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddProduct;
