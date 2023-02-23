import React from "react";
import styles from "./General.module.css";
import "./index.css";
import {
  Button,
  Form,
  Input,
  Select,
  message,
  Checkbox,
  Card,
  Skeleton,
} from "antd";
import { AiFillCaretRight, AiFillCaretDown } from "react-icons/ai";
import { apicall } from "../../../../utils/apicall/apicall";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { useEffect } from "react";
import ImageUploaderForEdit from "../../../../component/ImageUploader/ImageUploaderForEdit";
const General = ({ editData, categories, getData }) => {
  // for toggling  fields button
  const [info, setInfo] = useState(true);
  const [options, setOptions] = useState(true);
  const [pricing, setPricing] = useState(true);
  const [description, setDescription] = useState("");
  const [taxChecked, setTaxChecked] = useState(false);
  const [vatId, setVatId] = useState([]);
  const [imageCount, setImageCount] = useState(0);
  const [finalImages, setFinalImages]=useState([]);
  const [uploadedImage, setUploadedImage] = useState({
    product_main_image_data: {},
    type_product_main_image_detailed: {},
    file_product_main_image_detailed: {},
    product_add_additional_image_data: {},
    type_product_add_additional_image_detailed: {},
    file_product_add_additional_image_detailed: {},
    removed_image_pair_ids:{},
    product_main_image_data:{},
    product_additional_image_data:{}
  });
  // for setting vatId
  useEffect(() => {
    if (taxChecked) {
      getTax();
    } else {
      setVatId([]);
    }
  }, [taxChecked]);
  // for check vat and uncheck
  useEffect(() => {
    editData?.tax_ids.map((item) => {
      if (item == "6") {
        setTaxChecked(true);
      }
    });
  }, []);
  var {
    product_id,
    product,
    category_ids,
    price,
    full_description,
    options_type,
    exceptions_type,
    product_code,
    amount,
    zero_price_action,
    tracking,
    max_qty,
    min_qty,
    list_price,
    tax,
  } = editData ? editData : "";
  const options_t = [
    { label: "Simultaneous", value: "P" },
    { label: "Sequential", value: "S" },
  ];
  const exception_t = [
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
  const getSelectedCatLabel = (ids) => {
    let temp = categories
      ?.filter((item) => ids.includes(parseInt(item.category_id)))
      .map((el) => ({ label: el.category, value: el.category_id }));
    return temp;
  };
  const getImage = (data) => {
    let main_image = data?.main_pair;
    let additional_image = Object.values(data?.image_pairs).map((el, i) => ({
      uid: `${i + 1}`,
      name: `additional_mage_${i + 1}.jpg`,
      status: "done",
      url: el?.detailed?.image_path,
      pair_id:el?.pair_id
    }));
    if (Object.keys(main_image).length) {
      return [
        {
          uid: "0",
          name: "main_image.jpg",
          status: "done",
          url: main_image?.detailed?.image_path,
          pair_id:main_image?.pair_id
        },
        ...additional_image,
      ];
    } else {
      return [];
    }
  };
  // trigger while clicking  on create button if there is no any error at  client side
  const onFinish = (values) => {
    let available_image_prepare= {...uploadedImage}
    if(finalImages.length){
      finalImages.map((el, i)=>{
        if(i===0){
          available_image_prepare.product_main_image_data[el.pair_id]={
            "detailed_alt": "",
            "type": "M",
            "object_id": el.uid,
            "pair_id": el.pair_id,
            "position": i,
            "is_new": "N"
          }
        }else{
          available_image_prepare.product_additional_image_data[el?.pair_id]={
            "detailed_alt": "",
            "type": "A",
            "object_id": el.uid,
            "pair_id": el.pair_id,
            "position": i,
            "is_new": "N"
        }
        }
      })
    }
    const final_data= {...values, ...available_image_prepare, product_id:product_id, tax_ids: vatId, category_ids: values.category_ids[0]?.value
      ? category_ids
      : values.category_ids, }
    const timeOutId = setTimeout(async () => {
      // perform api call to retrieve data
       let result =await apicall({
        method: "put",
        url: `VendorProducts/${product_id}`,
        data: { ...final_data },
      });
      if(result?.data){
        getData()
      }
    }, 500);
    return () => clearTimeout(timeOutId);
  };
  // throw message while error occured at client side
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  // This function is used to retrieve categories from database
  const retrieveCategories = () => {
    const temp = categories?.map((dat, i) => ({
      label: dat.category,
      value: dat.category_id,
    }));
    return temp;
  };

  // this function is for category search
  const onSearch = (value) => {
    console.log("search:", value);
  };
  // get Tax  and set value to the state
  const getTax = async () => {
    const result = await apicall({
      url: "taxes",
    });
    if (result.data) {
      let tax = result?.data?.taxes?.filter((item) => {
        return item.tax === "VAT";
      });
      setVatId([...tax[0].tax_id]);
    }
  };

  return (
    <div className={styles.formContainer}>
      <Form
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        initialValues={{
          product: product,
          tracking: tracking,
          available_qty: amount,
          exceptions_type: exceptions_type,
          max_qty: max_qty,
          min_qty: min_qty,
          options_type: options_type,
          zero_price_action: zero_price_action,
          amount: amount,
          tax: "N",
          full_description: full_description,
          product_code: product_code,
          category_ids: getSelectedCatLabel(category_ids),
          price: parseFloat(price).toFixed(2),
          list_price: parseFloat(list_price).toFixed(2)
        }}
      >
        <Form.Item style={{ float: "right" }} name="submit_btn">
          <Button type="primary" htmlType="submit">
            Save Changes
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
              name="category_ids"
              rules={[
                {
                  required: true,
                  message: "Select your product category!",
                },
              ]}
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
                options={retrieveCategories()}
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
                  message: "Please  enter product list price!",
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
            <ImageUploaderForEdit
              message={message}
              uploadedImage={uploadedImage}
              setUploadedImage={setUploadedImage}
              imageCount={imageCount}
              setImageCount={setImageCount}
              Form={Form}
              imageList={getImage(editData)}
              finalImages={finalImages}
              setFinalImages={setFinalImages}
              
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
                options={options_t.map((option) => ({
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
                options={exception_t.map((exception) => ({
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
            <Form.Item label="CODE" name="product_code">
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
              extra="When inventory is tracked, the number of products in stock will
            decrease after each purchase."
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
  );
};

export default General;
