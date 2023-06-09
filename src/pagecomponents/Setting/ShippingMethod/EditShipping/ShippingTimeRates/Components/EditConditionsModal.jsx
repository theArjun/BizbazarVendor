import React, { useEffect } from "react";
import { Modal, Input, Select, Button, Form, message } from "antd";
import styles from "./EditConditionsModal.module.css";
import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
const options = [
  { label: "Absolute(रु)", value: "F" },
  { label: "Percentage(%)", value: "P" },
];
let keys = [];
const EditConditionsModal = ({
  modalOpen,
  setModalOpen,
  modalData,
  haveRate,
  setHaveRate,
}) => {
  const [type, setType] = useState("F");
  const [count, setCount] = useState(1);
  const onFinish = (values) => {
    if (parseInt(values?.range_from_value) > parseInt(values?.range_to_value)) {
      message.error("from value should be greater than to value!");
    } else {
      let temp_shipping_rates = [...haveRate];
      temp_shipping_rates[modalData?.index]["rate_value"] = {
        ...temp_shipping_rates[modalData?.index]["rate_value"],
        [modalData.rate_value]: {
          ...temp_shipping_rates[modalData?.index]["rate_value"][
            modalData.rate_value
          ],
          [count]: {
            range_from_value: values.range_from_value || "",
            range_to_value: values.range_to_value || "",
            value: values.value || "",
            type: type,
            index: count,
          },
        },
      };
      setHaveRate(temp_shipping_rates);
      setCount((current) => current + 1);
    }
  };
  const handleDelete = (deleteKey) => {
    const temp = [...haveRate];
    delete temp[modalData?.index]?.rate_value[modalData?.rate_value][deleteKey];
    setHaveRate(temp);
  };
  return (
    <Modal
      title={`${modalData.destination} ----->${modalData.condition}`}
      centered
      open={modalOpen}
      className={styles.condition_modal}
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
          haveRate[modalData?.index]?.rate_value[modalData?.rate_value] || {}
        ).map((item, i) => {
          keys.push(item?.range_from_value);
          return (
            <div key={i} className={styles.available_rates_parent_container}>
              <div className={styles.available_rates_container}>
                <div>
                  <Input
                    value={item.range_from_value}
                    onChange={(e) => {
                      let temp = [...haveRate];
                      if (item.index) {
                        temp[modalData.index].rate_value[modalData?.rate_value][
                          item.index
                        ].range_from_value = e.target.value;
                      } else {
                        temp[modalData.index].rate_value[modalData?.rate_value][
                          keys[i]
                        ].range_from_value = e.target.value;
                      }
                      setHaveRate(temp);
                    }}
                  />{" "}
                </div>

                <div>
                  <Input
                    value={item.range_to_value}
                    onChange={(e) => {
                      let temp = [...haveRate];
                      if (item?.index) {
                        temp[modalData.index].rate_value[modalData?.rate_value][
                          item.index
                        ].range_to_value = e.target.value;
                      } else {
                        temp[modalData.index].rate_value[modalData?.rate_value][
                          keys[i]
                        ].range_to_value = e.target.value;
                      }
                      setHaveRate(temp);
                    }}
                  />{" "}
                </div>
                <div>
                  <Input
                    value={item.value}
                    onChange={(e) => {
                      let temp = [...haveRate];
                      if (item?.index) {
                        temp[modalData.index].rate_value[modalData?.rate_value][
                          item.index
                        ].value = e.target.value;
                      } else {
                        temp[modalData.index].rate_value[modalData?.rate_value][
                          keys[i]
                        ].value = e.target.value;
                      }
                      setHaveRate(temp);
                    }}
                    addonAfter={
                      <Select
                        value={item.type}
                        onChange={(e) => {
                          let temp = [...haveRate];
                          if (item?.index) {
                            temp[modalData.index].rate_value[
                              modalData?.rate_value
                            ][item.index].type = e;
                          } else {
                            temp[modalData.index].rate_value[
                              modalData?.rate_value
                            ][keys[i]].type = e;
                          }
                          setHaveRate(temp);
                        }}
                        options={options}
                        style={{ minWidth: "120px" }}
                      />
                    }
                  />{" "}
                </div>
              </div>
              <a
                onClick={() =>
                  handleDelete(item?.index || item?.range_from_value)
                }
              >
                <AiFillDelete color="red" size={15} />
              </a>
            </div>
          );
        })}
      </div>
      <div className={styles.section_container}>
        <Form layout="vertical" onFinish={onFinish}>
          <div className={styles.section}>
            <Form.Item
              name="range_from_value"
              label="From(रु):"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item
              name="range_to_value"
              label="To(रु):"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Input type="number" />
            </Form.Item>

            <Form.Item
              name="value"
              label="Surcharge / Discount:"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
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
