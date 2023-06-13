import React from "react";
import { Checkbox, Input, InputNumber, Select } from "antd";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import styles from "./General.module.css";
const General = ({ general, setGeneral }) => {
  return (
    <div className={styles.option_general}>
      <div className={styles.option_input_items}>
        <div className={`${styles.label} ${styles.name_label}`}>
          Name <span>*</span>:
        </div>
        <div className={styles.value}>
          <Input
            type="text"
            value={general.option_name}
            onChange={(e) =>
              setGeneral((el) => ({ ...el, option_name: e.target.value }))
            }
          />
        </div>
      </div>
      <div className={styles.option_input_items}>
        <div className={styles.label}>Position:</div>
        <div className={styles.value}>
          <InputNumber
            type="number"
            min={0}
            value={general.position}
            onChange={(e) => setGeneral((el) => ({ ...el, position: e }))}
          />
        </div>
      </div>
      <div className={styles.option_input_items}>
        <div className={styles.label}>Storefront:</div>
        <div className={styles.value}> {general.storefront}</div>
      </div>
      <div className={styles.option_input_items}>
        <div className={styles.label}>Type:</div>
        <div className={styles.value}>
          <Select
            style={{ minWidth: "100px" }}
            value={general.option_type}
            onChange={(e) => setGeneral((el) => ({ ...el, option_type: e }))}
            options={[
              { label: "Checkbox", value: "C" },
              { label: "Radio", value: "R" },
            ]}
          />
        </div>
      </div>
      <div className={styles.option_input_items}>
        <div className={styles.label}>Description:</div>
        <div className={styles.value}>
          <ReactQuill
            type="snow"
            value={general.description}
            onChange={(e) => setGeneral((el) => ({ ...el, description: e }))}
          />
        </div>
      </div>
      <div className={styles.option_input_items}>
        <div className={styles.label}>Required:</div>
        <div className={styles.value}>
          <Checkbox
            checked={general.required}
            onChange={(e) =>
              setGeneral((el) => ({ ...el, required: e.target.checked }))
            }
          />
        </div>
      </div>
      <div className={styles.option_input_items}>
        <div className={styles.label}>Missing variants handling:</div>
        <div className={styles.value}>
          <Select
            style={{ minWidth: "100px" }}
            value={general.missing_variants_handling}
            onChange={(e) =>
              setGeneral((el) => ({ ...el, missing_variants_handling: e }))
            }
            options={[
              { label: "Checkbox", value: "C" },
              { label: "Radio", value: "R" },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default General;
