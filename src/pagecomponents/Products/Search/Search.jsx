import React, { useState } from "react";
import styles from "./Search.module.css";
import { Card, Form, Input, Select } from "antd";
import "./index.css";
import useDebounce from "../../../utils/Hooks/useDebounce";
const Search = ({ params, setParams, hasStatus, categories }) => {
  const [form] = Form.useForm();
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
  let cats = categories?.map((item) => ({
    label: item.category,
    value: item.category_id,
  }));
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
    let param = { ...values };
    param.price_from = value.min_price || "";
    param.price_to = value.max_price || "";
    param.category = value.category || "";
    param.name = value.name || "";
    param.status = value?.status || "";
    setValues(param);
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
