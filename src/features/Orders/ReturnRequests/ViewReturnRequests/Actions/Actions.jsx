import React from "react";
import styles from "./Actions.module.css";
import { Checkbox, Select, Radio, Space, Button } from "antd";
const status = [
  { label: "Completed", value: "C" },
  { label: "Declined", value: "D" },
  { label: "Approved", value: "A" },
  { label: "Requested", value: "R" },
];
const Actions = () => {
  const onChangeRadio = (value) => {
    console.log(value);
  };
  return (
    <div className={styles.actions}>
      <div className={styles.actions_body}>
        <div className={styles.actions_body_item}>
          <div className={styles.label}>Status:</div>
          <div className={styles.value}>
            <Select style={{ width: "120px" }} options={status} />
          </div>
        </div>
        <div className={styles.actions_body_item}>
          <div className={styles.label}>What to do with the order:</div>
          <div className={styles.value}>
            <Radio.Group onChange={onChangeRadio}>
              <Space direction="vertical">
                <Radio value={2}>Recalculate order</Radio>
                <Radio value={1}>Set the new order total manually</Radio>
                <Radio value={3}>Don't recalculate order</Radio>
              </Space>
            </Radio.Group>
          </div>
        </div>
        <div className={styles.actions_body_item}>
          <div className={styles.label}>Notify customer:</div>
          <div className={styles.value}>
            <Checkbox />
          </div>
        </div>
        <div className={styles.actions_body_item}>
          <div className={styles.label}>Notify orders department:</div>
          <div className={styles.value}>
            <Checkbox />
          </div>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <Button type="primary">Save</Button>
        </div>
      </div>
    </div>
  );
};

export default Actions;
