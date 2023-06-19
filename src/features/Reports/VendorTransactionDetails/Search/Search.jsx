import React, { useState } from "react";
import styles from "./Search.module.css";
import { Card, Input } from "antd";

import "./index.css";
import { DatePicker } from "antd";
import useDebounce from "../../../../utils/Hooks/useDebounce";

const { RangePicker } = DatePicker;

const Search = ({ params, setParams }) => {
  const [vendor, setVendor] = useState("");
  useDebounce(
    () => {
      let temp_param = { ...params };
      temp_param.vendor = vendor;
      setParams(temp_param);
    },
    500,
    [vendor]
  );

  const handleDateChange = (dates) => {
    let temp_param = { ...params };
    if (dates) {
      let startDate =
        new Date(dates[0]?.$y, dates[0]?.$M, dates[0]?.$D).getTime() / 1000;
      let endDate =
        new Date(dates[1]?.$y, dates[1]?.$M, dates[1]?.$D).getTime() / 1000;
      temp_param.time_from = startDate ? startDate : "";
      temp_param.time_to = endDate ? endDate : "";
    } else {
      temp_param.time_from = "";
      temp_param.time_to = "";
    }
    setParams(temp_param);
  };

  return (
    <div className={styles.container} id="changeHere">
      <Card>
        <div className={styles.formcolumn}>
          <label>
            Vendor
            <Input onChange={(e) => setVendor(e.target.value)} />
          </label>

          <label>
            Payout Date <br />
            <div style={{ display: "flex" }}>
              <RangePicker
                style={{ minWidth: "250px" }}
                onChange={(e) => handleDateChange(e)}
              />
            </div>
          </label>
        </div>
      </Card>
    </div>
  );
};

export default Search;
