import React from "react";
import styles from "./Appearance.module.css";
import { Checkbox } from "antd";
const Appearance = ({ data }) => {
  let option_keys = Object.keys(data?.product_views);
  let options = Object.values(data?.product_views);
  const getOptions = () => {
    let prepare_option = options?.map((item, i) => ({
      label: item,
      value: option_keys[i],
      disabled: true,
    }));
    return prepare_option;
  };
  return (
    <div className={styles.appearance}>
      <div className={styles.appearance_content}>
        <div className={styles.appearance_items}>
          <div className={styles.label}>Product details view:</div>
          <div className={styles.value}>
            {data?.product_detail_view?.default || ""}
          </div>
        </div>
        <div className={styles.appearance_items}>
          <div className={styles.label}>Use custom view:</div>
          <div className={styles.value}>
            <Checkbox
              disabled
              checked={Object.values(data?.selected_views || {})?.length}
            />
          </div>
        </div>
        <div className={styles.appearance_items}>
          <div className={styles.label}>Product columns:</div>
          <div className={styles.value}>{data?.product_columns || 0}</div>
        </div>
        <div className={styles.appearance_items}>
          <div className={styles.label}>Available views:</div>
          <div className={styles.value}>
            <Checkbox.Group
              defaultValue={
                Object.keys(data?.selected_layouts || {}).length
                  ? Object.keys(data?.selected_layouts || {})
                  : option_keys
              }
              options={getOptions()}
            ></Checkbox.Group>
          </div>
        </div>
        <div className={styles.appearance_items}>
          <div className={styles.label}>Default category view:</div>
          <div className={styles.value}>
            {data?.product_views[data?.default_layout] || options[0]}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appearance;
