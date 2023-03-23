import React from "react";
import { Input, Modal, Select } from "antd";
import styles from "./Modal.module.css";
const options = [
  { label: "Absolute(रु)", value: "A" },
  { label: "Percentage(रु)", value: "P" },
];
const RatesModal = ({
  modalOpen,
  setModalOpen,
  condition,
  setCondition,
  resetCondition,
}) => {
  return (
    <Modal
      title="Add conditions"
      maskClosable={false}
      centered
      open={modalOpen}
      onOk={() => setModalOpen(false)}
      onCancel={() => {
        resetCondition();
        setModalOpen(false);
      }}
      width={1000}
    >
      <div className={styles.wrap}>
        <div className={styles.container}>
          <h4>Price condition</h4>

          <div className={styles.section_container}>
            <div className={styles.section}>
              <label>From(रु):</label>{" "}
              <div>
                <Input
                  value={condition?.price_condition?.from}
                  onChange={(e) => {
                    let temp = { ...condition };
                    temp.price_condition.from = e.target.value;
                    setCondition(temp);
                  }}
                  type="number"
                />
              </div>
            </div>
            <div className={styles.section}>
              <label>To(रु):</label>{" "}
              <div>
                <Input
                  value={condition?.price_condition?.to}
                  onChange={(e) => {
                    let temp = { ...condition };
                    temp.price_condition.to = e.target.value;
                    setCondition(temp);
                  }}
                  type="number"
                />
              </div>
            </div>
            <div className={styles.section}>
              <label>Surcharge / Discount:</label>{" "}
              <div>
                <Input
                  type="number"
                  value={condition?.price_condition?.surcharge}
                  onChange={(e) => {
                    let temp = { ...condition };
                    temp.price_condition.surcharge = e.target.value;
                    setCondition(temp);
                  }}
                  addonAfter={
                    <Select
                      options={options}
                      style={{ minWidth: "150px" }}
                      value={condition?.price_condition?.type}
                      onChange={(e) => {
                        let temp = { ...condition };
                        temp.price_condition.type = e;
                        setCondition(temp);
                      }}
                    />
                  }
                />
              </div>
            </div>
          </div>

          <h4>Weight condition</h4>
          <div className={styles.section_container}>
            <div className={styles.section}>
              <label>From(Kg):</label>{" "}
              <div>
                <Input
                  type="number"
                  value={condition?.weight_condition?.from}
                  onChange={(e) => {
                    let temp = { ...condition };
                    temp.weight_condition.from = e.target.value;
                    setCondition(temp);
                  }}
                />
              </div>
            </div>
            <div className={styles.section}>
              <label>To(Kg):</label>{" "}
              <div>
                <Input
                  type="number"
                  value={condition?.weight_condition?.to}
                  onChange={(e) => {
                    let temp = { ...condition };
                    temp.weight_condition.to = e.target.value;
                    setCondition(temp);
                  }}
                />
              </div>
            </div>
            <div className={styles.section}>
              <label>Surcharge / Discount:</label>{" "}
              <div>
                <Input
                  type="number"
                  value={condition?.weight_condition?.surcharge}
                  onChange={(e) => {
                    let temp = { ...condition };
                    temp.weight_condition.surcharge = e.target.value;
                    setCondition(temp);
                  }}
                  addonAfter={
                    <Select
                      options={options}
                      value={condition?.weight_condition?.type}
                      onChange={(e) => {
                        let temp = { ...condition };
                        temp.weight_condition.type = e;
                        setCondition(temp);
                      }}
                      style={{ minWidth: "150px" }}
                    />
                  }
                />
              </div>
            </div>
          </div>
          <h4>Items condition</h4>
          <div className={styles.section_container}>
            <div className={styles.section}>
              <label>From(item):</label>{" "}
              <div>
                <Input
                  type="number"
                  value={condition?.items_condition?.from}
                  onChange={(e) => {
                    let temp = { ...condition };
                    temp.items_condition.from = e.target.value;
                    setCondition(temp);
                  }}
                />
              </div>
            </div>
            <div className={styles.section}>
              <label>To(item):</label>{" "}
              <div>
                <Input
                  type="number"
                  value={condition?.items_condition?.to}
                  onChange={(e) => {
                    let temp = { ...condition };
                    temp.items_condition.to = e.target.value;
                    setCondition(temp);
                  }}
                />
              </div>
            </div>
            <div className={styles.section}>
              <label>Surcharge / Discount:</label>{" "}
              <div>
                <Input
                  value={condition?.items_condition?.surcharge}
                  onChange={(e) => {
                    let temp = { ...condition };
                    temp.items_condition.surcharge = e.target.value;
                    setCondition(temp);
                  }}
                  type="number"
                  addonAfter={
                    <Select
                      options={options}
                      style={{ minWidth: "150px" }}
                      value={condition?.items_condition?.type}
                      onChange={(e) => {
                        let temp = { ...condition };
                        temp.items_condition.type = e;
                        setCondition(temp);
                      }}
                    />
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default RatesModal;
