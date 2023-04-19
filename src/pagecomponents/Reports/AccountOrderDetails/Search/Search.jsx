import React, { useEffect, useState } from "react";
import styles from "./Search.module.css";
import { Card, Input, Radio } from "antd";
import { Select } from "antd";

import "./index.css";
import { DatePicker } from "antd";
import { useGetPayments } from "../../../../apis/ReportsApi";

const Search = ({
  setSearchValue,
  sValue,
  setDload,
  setRadio,
  radio,
  page1,
}) => {
  const [paymentmethod, setPaymentMethod] = useState([]);
  const { data: paymentData } = useGetPayments();
  useEffect(() => {
    setPaymentMethod(paymentData?.data?.payments || []);
  }, [paymentData]);
  return (
    <div className={styles.container} id="changeHere">
      <Card>
        <div className={styles.formcolumn}>
          <label>
            Order No.
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
            Customer
            <Input
              type="text"
              value={sValue?.customername}
              onChange={(e) =>
                setSearchValue({
                  ...sValue,
                  customername: e.target.value,
                })
              }
            />
          </label>
          <label>
            Customer phone
            <Input
              type="number"
              value={sValue?.customerphone}
              onChange={(e) =>
                setSearchValue({
                  ...sValue,
                  customerphone: e.target.value,
                })
              }
            />
          </label>

          <label>
            Payment method
            <Select
              defaultValue=""
              style={{ width: "100%" }}
              onChange={(e) => {
                setSearchValue({
                  ...sValue,
                  paymentmethod: e,
                });
              }}
              options={[
                {
                  value: "",
                  label: "Select PaymentMethod ",
                },
                ...paymentmethod.map((dat) => ({
                  value: dat.payment_id,
                  label: dat.payment,
                })),
              ]}
            />
          </label>
          <label>
            <div>Account Status</div>

            <Select
              defaultValue=""
              style={{ width: "100%" }}
              onChange={(e) =>
                setSearchValue({
                  ...sValue,
                  accountstatus: e,
                })
              }
              options={[
                {
                  value: "",
                  label: "Select Account Status ",
                },
                {
                  value: "Paid",
                  label: "Paid",
                },
                {
                  value: "Pending",
                  label: "Pending",
                },
              ]}
            />
          </label>
          <label>
            RangePicker <br />
            <div style={{ display: "flex" }}>
              <DatePicker
                className={styles.date}
                onChange={(e, a) => {
                  const temp = { ...sValue };
                  temp.startDate = a;
                  setSearchValue(temp);
                }}
              />
              {"-"}
              <DatePicker
                className={styles.date}
                onChange={(e, a) => {
                  const temp = { ...sValue };
                  temp.endDate = a;
                  setSearchValue(temp);
                }}
              />
            </div>
          </label>
          <span className={styles.span}>
            <div> Order date</div>

            <div style={{ display: "flex" }}>
              <Radio
                value="O"
                checked={radio === "O" ? true : false}
                onClick={() => {
                  setRadio("O");
                }}
              >
                Order Created Date{" "}
              </Radio>
              <Radio
                value="S"
                checked={radio === "S" ? true : false}
                onClick={() => {
                  setRadio("S");
                }}
              >
                Settlement Date
              </Radio>
            </div>
          </span>
        </div>
      </Card>
    </div>
  );
};

export default Search;
