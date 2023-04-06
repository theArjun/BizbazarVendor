import React, { useState } from "react";
import styles from "./Search.module.css";
import { apicall } from "../../../utils/apicall/apicall";
import { Card, Form, Input, Select } from "antd";
import "./index.css";
import useDebounce from "../../../utils/Hooks/useDebounce";
const Search = ({ params, setParams, hasStatus }) => {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);
  const [values, setValues] = useState({
    name: "",
    price_from: "",
    price_to: "",
    category: "",
    status: "",
  });
  useDebounce(
    () => {
      let param = { ...params };
      param.price_from = values.price_from;
      param.price_to = values.price_to;
      param.category = values.category;
      param.product_name = values.name;
      param.status = hasStatus ? params.status : values.status;
      setParams(param);
    },
    500,
    [values]
  );
  const status = [
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
  const onValueChange = (a, value) => {
    const sData = { ...value };
    categories.map((item, index) => {
      if (value.category == item.label) {
        sData.cid = item.id;
      }
    });
    let param = { ...values };
    param.price_from = value.min_price || "";
    param.price_to = value.max_price || "";
    param.category = sData?.cid || "";
    param.name = value.name || "";
    param.status = value?.status || "";
    setValues(param);
  };
  const retrieveCategories = async () => {
    const category = [];
    // perform api call to retrieve data
    const result = await apicall({
      url: `categories`,
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
  const onSearch = (value) => {
    console.log("search:", value);
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
          autoComplete="off"
          onValuesChange={onValueChange}
        >
          <div className={styles.search_inputs}>
            <Form.Item
              id="req"
              label="Product name"
              name="name"
              style={{ width: "200px" }}
            >
              <Input type="text" />
            </Form.Item>
            <div>
              <label>Price (रु)</label>
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
            <Form.Item
              id="req"
              label="Search in categories"
              name="category"
              style={{ width: "200px" }}
            >
              <Select
                allowClear
                onClick={() => retrieveCategories()}
                showSearch
                placeholder="Select a category"
                optionFilterProp="children"
                onSearch={onSearch}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={categories}
              />
            </Form.Item>
            {hasStatus ? (
              ""
            ) : (
              <Form.Item
                label="Status"
                name="status"
                style={{ width: "200px" }}
              >
                <Select
                  allowClear
                  showSearch
                  optionFilterProp="children"
                  placeholder="Select by status"
                  onSearch={onSearch}
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={status}
                />
              </Form.Item>
            )}
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Search;
