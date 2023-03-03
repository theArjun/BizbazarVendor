import React, { useEffect, useState, forwardRef } from "react";
import styles from "./Search.module.css";
import { Card, Form, Input, Button, Radio } from "antd";
import { Select, Space } from "antd";

import "./index.css";
import { apicall } from "../../../../utils/apicall/apicall";
import { DatePicker } from "antd";

const { RangePicker } = DatePicker;

const Search = ({
  setSearchValue,
  sValue,
  setLoad,
  setDload,
  setRadio,
  radio,
  page1,
}) => {
  const [paymentmethod, setPaymentMethod] = useState([]);

  useEffect(() => {
    getpayment();
  }, []);

  const getpayment = async () => {
    const result = await apicall({
      url: "payments",
    });
    setPaymentMethod(result.data.payments);
  };

  return (
    <div className={styles.container} id="changeHere">
      <Card>
        <div className={styles.formcolumn}>
          <label>
            Gift Card Number
            <Input
              type="number"
              value={sValue?.orderno}
              onChange={(e) =>
                setSearchValue({
                  ...sValue,
                  orderno: e.target.value,
                })
              }
            />
          </label>
          <label>
            Gift Card Issue Date <br />
            <div style={{ display: "flex" }}>
              <DatePicker
                className={styles.date}
                onChange={(e, a) => {
                  const temp = sValue;
                  temp.startDate = a;

                  setDload((d) => !d);
                }}
              />
              {"-"}
              <DatePicker
                className={styles.date}
                onChange={(e, a) => {
                  const temp = sValue;
                  temp.endDate = a;
                  setSearchValue(temp);

                  setDload((d) => !d);
                }}
              />
            </div>
          </label>
          <label>
            Gift Card Used Date <br />
            <div style={{ display: "flex" }}>
              <DatePicker
                className={styles.date}
                onChange={(e, a) => {
                  const temp = sValue;
                  temp.startDate = a;

                  setDload((d) => !d);
                }}
              />
              {"-"}
              <DatePicker
                className={styles.date}
                onChange={(e, a) => {
                  const temp = sValue;
                  temp.endDate = a;
                  setSearchValue(temp);

                  setDload((d) => !d);
                }}
              />
            </div>
          </label>
        </div>
      </Card>
    </div>
  );
};

export default Search;
