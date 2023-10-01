import React, { useEffect, useState } from "react";
import styles from "./ShippingTimeRates.module.css";
import { Form, Select, Button, Input } from "antd";
import RatesTable from "./Components/Table";
const ShippingTimeRates = ({
  destinations,
  shippingTimeRates,
  setShippingTimeRates,
  haveRate,
  setHaveRate,
  allDestination,
}) => {
  const [form] = Form.useForm();
  // form submit function
  const onFinish = (values) => {
    let prepared_data = allDestination?.filter(
      (el) => el?.destination_id === values?.destination
    );
    let final_prepared_data = {
      ...prepared_data[0],
      delivery_time: values.shipping_time || "",
      base_rate: values.rate || "",
      rate_value: {},
    };
    // lets do set Values
    let temp_data = [...haveRate, { ...final_prepared_data }];
    setHaveRate(temp_data);
    form.resetFields();
  };
  return (
    <div className={styles.container}>
      <div className={styles.condition_body}>
        <div className={styles.condition_body_content}>
          <Form onFinish={onFinish} form={form} layout="vertical">
            <div className={styles.add_condition_field}>
              <div className={styles.condition_fields}>
                <Form.Item
                  className={styles.condition_field_item}
                  label="Destination"
                  name="destination"
                  rules={[
                    {
                      required: true,
                      message: "",
                    },
                  ]}
                >
                  <Select
                    placeholder="Select destination"
                    style={{
                      width: 200,
                    }}
                    options={destinations?.map((el) => ({
                      ...el,
                      disabled: haveRate?.some(
                        (item) => item?.destination_id === el?.value
                      ),
                    }))}
                  />
                </Form.Item>
                <div className={styles.selected_condition_content}>
                  <div className={styles.particular_condition}>
                    <Form.Item
                      name="shipping_time"
                      label="Shipping time"
                      style={{ minWidth: "90px" }}
                    >
                      <Input type="text" />
                    </Form.Item>
                    <Form.Item
                      style={{ minWidth: "90px" }}
                      name="rate"
                      label="Rate"
                    >
                      <Input type="number" />
                    </Form.Item>
                  </div>
                </div>
              </div>
              <Button type="primary" htmlType="submit">
                Add
              </Button>
            </div>
          </Form>
          <div className={styles.condition_table}>
            <RatesTable
              shippingTimeRates={haveRate}
              setShippingTimeRates={setShippingTimeRates}
              destinations={destinations}
              haveRate={haveRate}
              setHaveRate={setHaveRate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingTimeRates;
