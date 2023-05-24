import React from "react";
import styles from "./TotalData.module.css";
const TotalData = () => {
  return (
    <div className={styles.total_data}>
      <h4>Total</h4>
      <div className={styles.total_data_container}>
        <div className={styles.total_data_container_item}>
          <div>Categories</div>
          <div>1519</div>
        </div>
        <div className={styles.total_data_container_item}>
          <div>Products</div>
          <div>65</div>
        </div>
        <div className={styles.total_data_container_item}>
          <div>Active categories</div>
          <div>125</div>
        </div>
        <div className={styles.total_data_container_item}>
          <div>Hidden categories</div>
          <div>36</div>
        </div>{" "}
        <div className={styles.total_data_container_item}>
          <div>Disabled categories</div>
          <div>25</div>
        </div>
      </div>
    </div>
  );
};

export default TotalData;
