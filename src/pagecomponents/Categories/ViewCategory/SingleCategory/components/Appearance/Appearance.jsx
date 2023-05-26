import React from "react";
import styles from "./Appearance.module.css";
import { Checkbox } from "antd";
const Appearance = ({ data }) => {
  return (
    <div className={styles.appearance}>
      <div className={styles.appearance_content}>
        <div className={styles.appearance_items}>
          <div className={styles.label}>Product details view:</div>
          <div className={styles.value}>{data?.product_details_view || ""}</div>
        </div>
        <div className={styles.appearance_items}>
          <div className={styles.label}>Use custom view:</div>
          <div className={styles.value}>
            <Checkbox />
          </div>
        </div>
        <div className={styles.appearance_items}>
          <div className={styles.label}>Product columns:</div>
          <div className={styles.value}></div>
        </div>
        <div className={styles.appearance_items}>
          <div className={styles.label}>Available views:</div>
          <div className={styles.value}></div>
        </div>
        <div className={styles.appearance_items}>
          <div className={styles.label}>Default category view:</div>
          <div className={styles.value}></div>
        </div>
      </div>
    </div>
  );
};

export default Appearance;
