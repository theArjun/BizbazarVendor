import React, { useEffect, useState } from "react";
import styles from "./ShippingTimeRates.module.css";
import { Form, Select, Button, Input } from "antd";
import RatesTable from "./Components/Table";
import RatesModal from "./Components/Modal";
const INITIAL_CONDITIONS = {
  price_condition: {
    from: "",
    to: "",
    surcharge: "",
    type: "A",
  },
  weight_condition: {
    from: "",
    to: "",
    surcharge: "",
    type: "A",
  },
  items_condition: {
    from: "",
    to: "",
    surcharge: "",
    type: "A",
  },
};
const ShippingTimeRates = ({
  destinations,
  shippingTimeRates,
  setShippingTimeRates,
}) => {
  const [condition, setCondition] = useState({ ...INITIAL_CONDITIONS });
  const [modalOpen, setModalOpen] = useState(false);
  const [form] = Form.useForm();
  const resetCondition = () => {
    setCondition(INITIAL_CONDITIONS);
  };
  // form submit function
  const onFinish = (values) => {
    let prepared_data = { ...values, ...condition };
    console.log(
      "🚀 ~ file: ShippingTimeRates.jsx:37 ~ onFinish ~ prepared_data:",
      prepared_data
    );
    // lets do set Values
    let temp_data = [...shippingTimeRates, { ...prepared_data }];
    setShippingTimeRates(temp_data);
    setCondition(INITIAL_CONDITIONS);
    form.resetFields();
  };
  useEffect(() => {
    console.log(INITIAL_CONDITIONS);
  }, [condition]);
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
                    options={destinations}
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

                    <Button onClick={() => setModalOpen(true)}>
                      Add Conditions
                    </Button>
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
              shippingTimeRates={shippingTimeRates}
              destinations={destinations}
            />
          </div>
        </div>
        <RatesModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          condition={condition}
          setCondition={setCondition}
          resetCondition={resetCondition}
        />
      </div>
    </div>
  );
};

export default ShippingTimeRates;
