import React from "react";
import styles from "./AdditionalSettings.module.css";
import { Typography, Checkbox } from "antd";
const { Text } = Typography;
const AdditionalSettings = ({ setSingleShipment, singleShipment }) => {
  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        <h3>Pricing</h3>

        <div></div>
        <div className={styles.section}>
          <label>Taxes:</label>{" "}
          <div>
            {" "}
            <Checkbox
              checked={singleShipment?.tax_ids[0] === "6"}
              onChange={(e) => {
                let temp = { ...singleShipment };
                if (e.target.checked) {
                  temp.tax_ids = ["6"];
                } else {
                  temp.tax_ids = [];
                }
                setSingleShipment(temp);
              }}
            >
              VAT
            </Checkbox>
          </div>
        </div>
        <div className={styles.section}>
          <label>Use for free shipping:</label>{" "}
          <div>
            <Checkbox
              checked={singleShipment?.free_shipping === "Y"}
              onChange={(e) => {
                let temp = { ...singleShipment };
                if (e.target.checked) {
                  temp.free_shipping = "Y";
                } else {
                  temp.free_shipping = "N";
                }
                setSingleShipment(temp);
              }}
            ></Checkbox>
            <br />
            <Text type="secondary">
              Exclude products with the enabled Free shipping option from the
              shipping price calculation
            </Text>
          </div>
        </div>

        <h3>Customer information</h3>
        <div className={styles.section}>
          <label>Customer must specify his/her address:</label>{" "}
          <div style={{ display: "flex" }}>
            <Checkbox
              checked={singleShipment?.is_address_required === "Y"}
              onChange={(e) => {
                let temp = { ...singleShipment };
                if (e.target.checked) {
                  temp.is_address_required = "Y";
                } else {
                  temp.is_address_required = "N";
                }
                setSingleShipment(temp);
              }}
            ></Checkbox>
            <div />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdditionalSettings;
