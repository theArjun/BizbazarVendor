import React, { useState } from "react";
import styles from "./Search.module.css";
import { Card, Form, Input, DatePicker } from "antd";
import { Select, Space } from "antd";
import useDebounce from "../../../../utils/Hooks/useDebounce";
import "./index.css";
const { RangePicker } = DatePicker;
const Search = ({ params, setParams, status }) => {
  const [orderID, setOrderID] = useState("");

  useDebounce(
    () => {
      let temp_param = { ...params };
      temp_param.order_id = orderID;
      setParams(temp_param);
    },
    500,
    [orderID]
  );

  // date picker handle change
  const handleDateChange = (dates) => {
    let temp_param = { ...params };
    if (dates) {
      let startDate =
        new Date(dates[0]?.$y, dates[0]?.$M, dates[0]?.$D).getTime() / 1000;
      let endDate =
        new Date(dates[1]?.$y, dates[1]?.$M, dates[1]?.$D).getTime() / 1000;
      temp_param.date = `time_from=${startDate}&time_to=${endDate}`;
    } else {
      temp_param.date = "test=9";
    }
    setParams(temp_param);
  };
  return (
    <div className={styles.container} id="changeHere">
      <Card>
        <div className={styles.formcolumn}>
          <label>
            Order ID
            <Input type="number" onChange={(e) => setOrderID(e.target.value)} />
          </label>
          <label>
            <div>Order Status</div>

            <Select
              placeholder={"Search order status"}
              style={{ width: "100%" }}
              onChange={(e) => {
                let temp_param = { ...params };
                temp_param.status_id = e;
                setParams(temp_param);
              }}
              options={status}
            />
          </label>
          <label>
            Order date: <br />
            <div style={{ minWidth: "250px" }}>
              <RangePicker onChange={(e) => handleDateChange(e)} />
            </div>
          </label>
        </div>
      </Card>
    </div>
  );
};

export default Search;
