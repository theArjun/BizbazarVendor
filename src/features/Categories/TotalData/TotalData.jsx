import React from "react";
import styles from "./TotalData.module.css";
const TotalData = ({ data }) => {
  return (
    <div className={styles.total_data}>
      <h4>Total</h4>
      <div className={styles.total_data_container}>
        <div className={styles.total_data_container_item}>
          <div>Categories</div>
          <div>{data?.categories_total || ""}</div>
        </div>
        <div className={styles.total_data_container_item}>
          <div>Products</div>
          <div>{data?.products_total || ""}</div>
        </div>
        <div className={styles.total_data_container_item}>
          <div>Active categories</div>
          <div>{data?.categories_active || ""}</div>
        </div>
        <div className={styles.total_data_container_item}>
          <div>Hidden categories</div>
          <div>{data?.categories_hidden || ""}</div>
        </div>{" "}
        <div className={styles.total_data_container_item}>
          <div>Disabled categories</div>
          <div>{data?.categories_disabled || ""}</div>
        </div>
      </div>
    </div>
  );
};

export default TotalData;
