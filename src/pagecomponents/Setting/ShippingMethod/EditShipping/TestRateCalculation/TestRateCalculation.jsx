import React from "react";
import { Input, Typography, Select } from "antd";
import styles from "./TestRateCalculation.module.css";
import { useState } from "react";
const { Text } = Typography;
const TestRateCalculation = ({
  countries,
  states,
  sender,
  setSender,
  recipient,
  setRecipient,
}) => {
  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        <div className={styles.section}>
          <label>Weight(kg):</label>{" "}
          <div>
            <Input type="number" style={{ maxWidth: "300px" }} />
            <br />
            <Text type="secondary">
              {" "}
              Rates are calculated for 1 product that costs रु100.
            </Text>
          </div>
        </div>
        <div className={styles.addresses}>
          <div className={styles.address_container}>
            <h3>Recipient</h3>
            <div className={styles.section}>
              <label>Country:</label>{" "}
              <div>
                {" "}
                <Select
                  value={recipient?.country}
                  showSearch
                  placeholder="Country"
                  style={{ maxWidth: "300px" }}
                  onChange={(e) => {
                    let temp = { ...recipient };
                    temp.country = e;
                    setRecipient(temp);
                  }}
                  options={countries}
                />
              </div>
            </div>
            <div className={styles.section}>
              <label>State/Province :</label>{" "}
              <div>
                {" "}
                <Select
                  showSearch
                  value={recipient?.state}
                  placeholder="State"
                  style={{ maxWidth: "300px" }}
                  onChange={(e) => {
                    let temp = { ...recipient };
                    temp.state = e;
                    setRecipient(temp);
                  }}
                  options={
                    states[recipient?.country]?.map((el) => ({
                      label: el?.state,
                      value: el?.code,
                    })) || []
                  }
                />
              </div>
            </div>
            <div className={styles.section}>
              <label>City:</label>{" "}
              <div>
                <Input
                  value={recipient?.city}
                  type="text"
                  style={{ maxWidth: "300px" }}
                  onChange={(e) => {
                    let temp = { ...recipient };
                    temp.city = e.target.value;
                    setRecipient(temp);
                  }}
                />
              </div>
            </div>
            <div className={styles.section}>
              <label>Zip/postal code :</label>{" "}
              <div>
                <Input
                  value={recipient?.zipcode}
                  type="number"
                  style={{ maxWidth: "300px" }}
                  onChange={(e) => {
                    let temp = { ...recipient };
                    temp.zipcode = e.target.value;
                    setRecipient(temp);
                  }}
                />
              </div>
            </div>
            <div className={styles.section}>
              <label>Address:</label>{" "}
              <div>
                <Input
                  value={recipient?.address}
                  type="text"
                  style={{ maxWidth: "300px" }}
                  onChange={(e) => {
                    let temp = { ...recipient };
                    temp.address = e.target.value;
                    setRecipient(temp);
                  }}
                />
              </div>
            </div>
          </div>
          <div className={styles.address_container}>
            <h3>Sender</h3>
            <div className={styles.section}>
              <label>Country:</label>{" "}
              <div>
                {" "}
                <Select
                  showSearch
                  value={sender?.country}
                  placeholder="Country"
                  style={{ maxWidth: "300px" }}
                  onChange={(e) => {
                    let temp = { ...sender };
                    temp.country = e;
                    setSender(temp);
                  }}
                  options={countries}
                />
              </div>
            </div>
            <div className={styles.section}>
              <label>State/Province :</label>{" "}
              <div>
                {" "}
                <Select
                  showSearch
                  value={sender?.state}
                  placeholder="State"
                  style={{ maxWidth: "300px" }}
                  onChange={(e) => {
                    let temp = { ...sender };
                    temp.state = e;
                    setSender(temp);
                  }}
                  options={
                    states[sender?.country]?.map((el) => ({
                      label: el?.state,
                      value: el?.code,
                    })) || []
                  }
                />
              </div>
            </div>
            <div className={styles.section}>
              <label>City:</label>{" "}
              <div>
                <Input
                  value={sender?.city}
                  type="text"
                  style={{ maxWidth: "300px" }}
                  onChange={(e) => {
                    let temp = { ...sender };
                    temp.city = e.target.value;
                    setSender(temp);
                  }}
                />
              </div>
            </div>
            <div className={styles.section}>
              <label>Zip/postal code :</label>{" "}
              <div>
                <Input
                  value={sender?.zipcode}
                  type="number"
                  style={{ maxWidth: "300px" }}
                  onChange={(e) => {
                    let temp = { ...sender };
                    temp.zipcode = e.target.value;
                    setSender(temp);
                  }}
                />
              </div>
            </div>
            <div className={styles.section}>
              <label>Address:</label>{" "}
              <div>
                <Input
                  value={sender?.address}
                  type="text"
                  style={{ maxWidth: "300px" }}
                  onChange={(e) => {
                    let temp = { ...sender };
                    temp.address = e.target.value;
                    setSender(temp);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestRateCalculation;
