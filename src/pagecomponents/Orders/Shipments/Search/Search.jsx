import React, { useState } from "react";
import styles from "./Search.module.css";
import { Card, Form, Input, Select } from "antd";
import useDebounce from "../../../../utils/Hooks/useDebounce";

const Search = ({ params, setParams }) => {
  const [values, setValues] = useState(params);
  useDebounce(
    () => {
      let temp = { ...params };
      temp.cname = values.cname || "";
      temp.email = values.email || "";
      temp.phone = values.phone || "";
      temp.order_id = values.order_id || "";
      temp.total_from = values.total_from || "";
      temp.total_to = values.total_to || "";
      setParams(temp);
    },
    1200,
    [values]
  );
  const [form] = Form.useForm();
  const onValueChange = (a, value) => {
    let temp = { ...values };
    temp.cname = value.customer;
    temp.email = value.email;
    temp.phone = value.phone;
    temp.order_id = value.orderid;
    temp.total_from = value.min_price;
    temp.total_to = value.max_price;
    setValues(temp);
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
          onValuesChange={onValueChange}
          autoComplete="off"
        >
          <div className={styles.search_inputs}>
            <Form.Item id="customer" label="Customer" name="customer">
              <Input type="text" />
            </Form.Item>
            <Form.Item id="order_id" label="Order ID" name="order_id">
              <Input type="text" />
            </Form.Item>
            <Form.Item
              id="full_order_shipment"
              label="Full order shipment"
              name="full_order_shipment"
            >
              <Select
                showSearch
                allowClear
                options={[
                  { label: "OK", value: "O" },
                  { label: "Pending", value: "P" },
                ]}
              />
            </Form.Item>
            <Form.Item
              id="status"
              label="Status"
              name="status"
              style={{ width: "150px" }}
            >
              <Select
                showSearch
                allowClear
                options={[
                  { label: "OK", value: "O" },
                  { label: "Pending", value: "P" },
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
