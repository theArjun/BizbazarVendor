import React, { useEffect, useState, forwardRef } from "react";
import styles from "./Search.module.css";
import { Card, Form, Input, Button, Radio } from "antd";
import { Select, Space } from "antd";

import "./index.css";
import { apicall } from "../../../../utils/apicall/apicall";
import { DatePicker } from "antd";
import DateRangePickerComp from "../../../Home/RangePicker/Rangepicker";

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
              {/* <input
                type="date"
                value={sValue?.startDate}
                onChange={(e) => {
                  setSearchValue({
                    startDate: e.target.value,
                    ...sValue,
                  });
                  setDload((d) => !d);
                }}
              ></input>
              -
              <input
                type="date"
                // value={sValue?.endDate}
                onChange={(e, a) => {
                  console.log(e.target.value);
                  const temp = sValue;
                  // console.log(temp);
                  temp.endDate = e.target.value;
                  // console.log(temp);
                  setSearchValue(temp);
                  setDload((d) => !d);
                }}
              ></input> */}
              <DatePicker
                className={styles.date}
                onChange={(e, a) => {
                  const temp = sValue;
                  temp.startDate = a;
                  setSearchValue(temp);
                  // setSearchValue({
                  //   srange: e,
                  //   startDate: a,
                  //   ...sValue,
                  // });
                  setDload((d) => !d);
                }}
              />{" "}
              <DatePicker
                className={styles.date}
                onChange={(e, a) => {
                  const temp = sValue;
                  temp.endDate = a;
                  setSearchValue(temp);
                  // setSearchValue({
                  //   erange: e,
                  //   endDate: a,
                  //   ...sValue,
                  // });
                  setDload((d) => !d);
                }}
              />
            </div>
            {/* <RangePicker
              value={sValue?.range}
              className={styles.datepicker}
              onChange={(e, a) => {
                setSearchValue({
                  range: e,
                  date: a,
                  ...sValue,
                });
                setDload((d) => !d);
              }}
            /> */}
          </label>
          <span className={styles.span}>
            <div> Order date</div>

            <div style={{ display: "flex" }}>
              <Radio
                value="O"
                checked={radio === "O" ? true : false}
                onClick={() => {
                  setRadio("O");
                  page1.current = 1;
                }}
              >
                Order Created Date{" "}
              </Radio>
              <Radio
                value="S"
                checked={radio === "S" ? true : false}
                onClick={() => {
                  setRadio("S");
                  page1.current = 1;
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
