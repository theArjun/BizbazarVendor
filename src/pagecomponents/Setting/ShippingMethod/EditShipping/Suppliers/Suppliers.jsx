import React from "react";
import styles from "./Suppliers.module.css";
import { Checkbox } from "antd";
const Suppliers = ({ singleShipment, setSingleShipment }) => {
  return (
    <div className={styles.suppliers}>
      <div className={styles.section}>
        <label>Available for supplier :</label>{" "}
        <div>
          <Checkbox
            checked={singleShipment?.supplier_id === "0"}
            onChange={(e) => {
              let temp = { ...singleShipment };
              if (e.target.checked) {
                temp.supplier_id = "0";
              } else {
                temp.supplier_id = "1";
              }
              setSingleShipment(temp);
            }}
          >
            None
          </Checkbox>
        </div>
      </div>
    </div>
  );
};

export default Suppliers;
