import React, { useState } from "react";
import styles from "./Search.module.css";
import { Card, Form, Input } from "antd";
import useDebounce from "../../../../utils/Hooks/useDebounce";

const ViewOrderSearch = ({ params, setParams }) => {
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
            <Form.Item id="email" label="E-mail" name="email">
              <Input type="text" />
            </Form.Item>
            <Form.Item id="phone" label="Phone" name="phone">
              <Input type="tel" />
            </Form.Item>
            <Form.Item id="orderid" label="Order Id" name="orderid">
              <Input type="tel" />
            </Form.Item>

            <div>
              <label>Total (रु)</label>
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
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default ViewOrderSearch;
