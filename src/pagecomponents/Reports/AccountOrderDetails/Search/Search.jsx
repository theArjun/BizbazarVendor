import React, { useEffect, useState, forwardRef } from "react";
import styles from "./Search.module.css";
import { Card, Form, Input, Button, Radio, DatePicker } from "antd";
import { Select, Space } from "antd";
import { BsChevronDown } from "react-icons/bs";

import "./index.css";
import DateRangePickerComp from "../../../Home/RangePicker/Rangepicker";
import { apicall } from "../../../../utils/apicall/apicall";

const Search = ({ setSearchValue, sValue, range, setRange, setLoad }) => {
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
              type="text"
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
              style={{ width: 120 }}
              onChange={(e) =>
                setSearchValue({
                  ...sValue,
                  paymentmethod: e,
                })
              }
              options={paymentmethod.map((dat) => ({
                value: dat.payment_id,
                label: dat.payment,
              }))}
            />
          </label>
          <label>
            <div>Account Status</div>

            <Select
              defaultValue=""
              style={{ width: 120 }}
              onChange={(e) =>
                setSearchValue({
                  ...sValue,
                  accountstatus: e,
                })
              }
              options={[
                {
                  value: "paid",
                  label: "Paid",
                },
                {
                  value: "pending",
                  label: "Pending",
                },
              ]}
            />
          </label>
          {/* <label>
            <div style={{ marginBottom: "3px" }}>Account Status</div>
            <div>
              <Radio>Order Created Date</Radio>
              <Radio>Settlement Date</Radio>
            </div>
          </label> */}
          <label>
            RangePicker
            <DateRangePickerComp
              setLoad={setLoad}
              range={range}
              setRange={setRange}
            />
          </label>
        </div>
      </Card>
    </div>
  );
};

export default Search;
