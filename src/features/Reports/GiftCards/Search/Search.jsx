import React, { useState } from "react";
import styles from "./Search.module.css";
import { Card, Input } from "antd";
import "./index.css";
import { DatePicker } from "antd";
import useDebounce from "../../../../utils/Hooks/useDebounce";
const { RangePicker } = DatePicker;
const Search = ({ params, setParams }) => {
  const [cardNumber, setCardNumber] = useState([]);
  useDebounce(
    () => {
      let temp_param={...params}
      temp_param.gift_card_number=cardNumber;
      setParams(temp_param)
    },
    500,
    [cardNumber]
  );
  // date picker handle change
  const handleIssueDateChange = (dates) => {
    let temp_param = { ...params };
    if (dates) {
      let startDate =
        new Date(dates[0]?.$y, dates[0]?.$M, dates[0]?.$D).getTime() / 1000;
      let endDate =
        new Date(dates[1]?.$y, dates[1]?.$M, dates[1]?.$D).getTime() / 1000;
      temp_param.issued_time_from = startDate;
      temp_param.issued_time_from = endDate;
    } else {
      temp_param.issued_time_from = "";
      temp_param.issued_time_to = "";
    }
    setParams(temp_param);
  };
  // date picker handle change
  const handleUsedDateChange = (dates) => {
    let temp_param = { ...params };
    if (dates) {
      let startDate =
        new Date(dates[0]?.$y, dates[0]?.$M, dates[0]?.$D).getTime() / 1000;
      let endDate =
        new Date(dates[1]?.$y, dates[1]?.$M, dates[1]?.$D).getTime() / 1000;
      temp_param.used_time_from = startDate;
      temp_param.used_time_to = endDate;
    } else {
      temp_param.used_time_from = "";
      temp_param.used_time_to = "";
    }
    setParams(temp_param);
  };
  return (
    <div className={styles.container} id="changeHere">
      <Card>
        <div className={styles.formcolumn}>
          <label>
            Gift Card Number
            <Input onChange={(e) => setCardNumber(e.target.value)} />
          </label>
          <label>
            Gift Card Issue Date <br />
            <div style={{ display: "flex" }}>
              <RangePicker onChange={(e) => handleIssueDateChange(e)} />
            </div>
          </label>
          <label>
            Gift Card Used Date <br />
            <div style={{ display: "flex" }}>
              <RangePicker onChange={(e) => handleUsedDateChange(e)} />
            </div>
          </label>
        </div>
      </Card>
    </div>
  );
};

export default Search;
