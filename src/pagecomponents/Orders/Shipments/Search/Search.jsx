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
      temp.order_id = values.order_id || "";
      temp.full_order_shipment = values.full_order_shipment || "";
      temp.status = values.status || "";
      setParams(temp);
    },
    1200,
    [values]
  );
  const [form] = Form.useForm();
  const onValueChange = (a, value) => {
    let temp = { ...values };
    temp.cname = value.customer;
    temp.order_id = value.order_id;
    temp.full_order_shipment = value.full_order_shipment;
    temp.status = value.status;
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
                  { label: "OK", value: "OK" },
                  { label: "Pending", value: "Pending" },
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
