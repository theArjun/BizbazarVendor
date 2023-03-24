import React, { useEffect } from "react";
import { Modal, Input, Select, Button, Form } from "antd";
import styles from "./EditConditionsModal.module.css";
import { useState } from "react";
const options = [
  { label: "Absolute(रु)", value: "F" },
  { label: "Percentage(रु)", value: "P" },
];
const EditConditionsModal = ({
  modalOpen,
  setModalOpen,
  modalData,
  shippingTimeRates,
  setShippingTimeRates,
}) => {
  const [type, setType] = useState("F");
  const [count, setCount] = useState(1);
  const [keys, setKeys] = useState([]);
  useEffect(() => {
    setKeys(
      Object.keys(
        shippingTimeRates[modalData?.index]?.rate_value[
          modalData?.rate_value
        ] || {}
      )
    );
  }, []);
  const onFinish = (values) => {
    let temp_shipping_rates = [...shippingTimeRates];
    temp_shipping_rates[modalData?.index]["rate_value"] = {
      [modalData.rate_value]: {
        ...temp_shipping_rates[modalData?.index]["rate_value"][
          modalData.rate_value
        ],
        [values.range_from_value || count]: {
          range_from_value: values.range_from_value || "",
          range_to_value: values.range_to_value || "",
          value: values.value || "",
          type: type,
          index: count,
        },
      },
    };
    setShippingTimeRates(temp_shipping_rates);
    setCount((current) => current + 1);
  };
  return (
    <Modal
      title={`${modalData.destination} ----->${modalData.condition}`}
      centered
      open={modalOpen}
      onOk={() => setModalOpen(false)}
      onCancel={() => setModalOpen(false)}
      width={800}
      cancelButtonProps={{
        style: {
          display: "none",
        },
      }}
    >
      <div className={styles.available_rates}>
        {Object.values(
          shippingTimeRates[modalData?.index]?.rate_value[
            modalData?.rate_value
          ] || {}
        ).map((item, i) => (
          <div key={i} className={styles.available_rates_container}>
            <div>
              <Input
                value={item.range_from_value}
                onChange={(e) => {
                  let temp = { ...shippingTimeRates };

                  temp[modalData.index].rate_value[modalData?.rate_value] = {
                    ...temp[modalData.index].rate_value[modalData?.rate_value],
                    [item.range_from_value]: {
                      ...temp[modalData.index].rate_value[
                        modalData?.rate_value
                      ][keys[i]],
                      range_from_value: e.target.value,
                    },
                  };
                  setShippingTimeRates(temp);
                  console.log(
                    temp[modalData.index].rate_value[modalData?.rate_value][
                      item?.range_from_value
                    ]
                  );
                }}
              />{" "}
            </div>

            <div>
              <Input value={item?.range_to_value} />{" "}
            </div>
            <div>
              <Input
                value={item?.value}
                addonAfter={
                  <Select
                    value={type}
                    options={options}
                    style={{ minWidth: "120px" }}
                    onChange={(e) => setType(e)}
                  />
                }
              />{" "}
            </div>
          </div>
        ))}
      </div>
      <div className={styles.section_container}>
        <Form layout="vertical" onFinish={onFinish}>
          <div className={styles.section}>
            <Form.Item name="range_from_value" label="From(रु):">
              <Input type="number" />
            </Form.Item>
            <Form.Item name="range_to_value" label="To(रु):">
              <Input type="number" />
            </Form.Item>

            <Form.Item name="value" label="Surcharge / Discount:">
              <Input
                type="number"
                addonAfter={
                  <Select
                    value={type}
                    options={options}
                    style={{ minWidth: "120px" }}
                    onChange={(e) => setType(e)}
                  />
                }
              />
            </Form.Item>

            <Button htmlType="submit">Add</Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default EditConditionsModal;
