import React, { useEffect, useState } from "react";
import styles from "./Search.module.css";
import { Card, Input, Radio } from "antd";
import { Select } from "antd";

import "./index.css";
import { DatePicker } from "antd";
import { useGetPayments } from "../../../../apis/ReportsApi";

const Search = ({ setSearchValue, sValue, setRadio, radio }) => {
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
              value={sValue?.order_id}
              onChange={(e) =>
                setSearchValue({
                  ...sValue,
                  order_id: e.target.value,
                })
              }
            />
          </label>
          <label>
            Customer
            <Input
              type="text"
              value={sValue?.customer}
              onChange={(e) =>
                setSearchValue({
                  ...sValue,
                  customer: e.target.value,
                })
              }
            />
          </label>
          <label>
            Customer phone
            <Input
              type="number"
              value={sValue?.phone}
              onChange={(e) =>
                setSearchValue({
                  ...sValue,
                  phone: e.target.value,
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
                  payment_id: e,
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
                  account_status: e,
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
                  let sdate = a.split("-");
                  temp.time_from =
                    sdate[2] + "/" + sdate[1] + "/" + sdate[0] || "";
                  setSearchValue(temp);
                }}
              />
              {"-"}
              <DatePicker
                className={styles.date}
                onChange={(e, a) => {
                  const temp = { ...sValue };
                  let edate = a.split("-");
                  temp.time_to =
                    edate[2] + "/" + edate[1] + "/" + edate[0] || "";
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
