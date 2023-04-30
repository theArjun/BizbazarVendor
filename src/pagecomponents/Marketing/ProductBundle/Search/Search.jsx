import React from "react";
import { Card, Form, Input, Select } from "antd";
import styles from "./search.module.css";
const Search = () => {
  const onValueChange = (a, value) => {
    // let param = { ...values };
    // param.price_from = value.min_price || "";
    // param.price_to = value.max_price || "";
    // param.category = value.category || "";
    // param.name = value.name || "";
    // param.status = value?.status || "";
    // setValues(param);
  };
  return (
    <div className={styles.container}>
      <Card bordered={true}>
        <Form
          layout="vertical"
          className={styles.form}
          name="basic"
          wrapperCol={{}}
          autoComplete="off"
          onValuesChange={onValueChange}
        >
          <div className={styles.search_inputs}>
            <Form.Item
              id="req"
              label="Title"
              name="name"
              style={{ width: "200px" }}
            >
              <Input type="text" />
            </Form.Item>
            <div>
              <label>Price for all (रु )</label>
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
            <Form.Item label="Status" name="status" style={{ width: "200px" }}>
              <Select
                optionFilterProp="children"
                placeholder="Search by status"
                defaultValue={""}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={[
                  { label: "All", value: "" },
                  { label: "Active", value: "A" },
                  { label: "Disabled", value: "D" },
                ]}
              />
            </Form.Item>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Search;
