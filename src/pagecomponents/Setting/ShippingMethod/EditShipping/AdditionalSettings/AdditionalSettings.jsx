import React from "react";
import styles from "./AdditionalSettings.module.css";
const AdditionalSettings = () => {
  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        <h3>Pricing</h3>

        <div></div>
        <div className={styles.section}>
          <label>Taxes:</label> <div>Content</div>
        </div>
        <div className={styles.section}>
          <label>Use for free shipping:</label> <div>Content</div>
        </div>

        <h3>Customer information</h3>
        <div className={styles.section}>
          <label>Customer must specify his/her address:</label>{" "}
          <div style={{ display: "flex" }}>
            Content
            <div />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdditionalSettings;
