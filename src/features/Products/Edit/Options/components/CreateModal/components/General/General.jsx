import React from "react";
import { Checkbox, Input, InputNumber, Select } from "antd";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import styles from "./General.module.css";
const OPTION_TYPES = [
  { label: "Select box", value: "S" },
  { label: "Radiogroup", value: "R" },
  { label: "Checkbox", value: "C" },
  { label: "Text(one line)", value: "I" },
  { label: "Text area", value: "T" },
  { label: "File", value: "F" },
];
const General = ({ general, setGeneral, isMyOption }) => {
  return (
    <div className={styles.option_general}>
      <div className={styles.option_input_items}>
        <div className={`${styles.label} ${styles.name_label}`}>
          Name <span>*</span>:
        </div>
        <div className={styles.value}>
          <Input
            disabled={!isMyOption}
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
            disabled={!isMyOption}
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
            style={{ minWidth: "150px" }}
            value={general?.option_type}
            disabled={!isMyOption}
            onChange={(e) => setGeneral((el) => ({ ...el, option_type: e }))}
            options={OPTION_TYPES}
          />
        </div>
      </div>
      <div className={styles.option_input_items}>
        <div className={styles.label}>Description:</div>
        <div className={styles.value}>
          <ReactQuill
            type="snow"
            readOnly={!isMyOption}
            value={general.description}
            onChange={(e) => setGeneral((el) => ({ ...el, description: e }))}
          />
        </div>
      </div>
      <div className={styles.option_input_items}>
        <div className={styles.label}>Comment:</div>
        <div className={styles.value}>
          <Input
            disabled={!isMyOption}
            type="text"
            value={general?.comment}
            onChange={(e) =>
              setGeneral((el) => ({ ...el, comment: e.target.value }))
            }
          />
        </div>
      </div>
      <div className={styles.option_input_items}>
        <div className={styles.label}>Required:</div>
        <div className={styles.value}>
          <Checkbox
            disabled={!isMyOption}
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
            disabled={!isMyOption}
            style={{ minWidth: "200px" }}
            value={general.missing_variants_handling}
            onChange={(e) =>
              setGeneral((el) => ({ ...el, missing_variants_handling: e }))
            }
            options={[
              { label: "Display message", value: "M" },
              { label: "Hide option completely", value: "H" },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default General;
