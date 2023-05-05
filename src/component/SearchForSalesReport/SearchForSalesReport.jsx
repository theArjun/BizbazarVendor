import React from "react";
import { Card, Form, Select, Input, DatePicker } from "antd";
import styles from "./SearchForSalesReport.module.css";
import { useEffect } from "react";
import { useState } from "react";
const { RangePicker } = DatePicker;
const PERIOD = [
  {
    label: "This day",
    value: "D",
  },
  {
    label: "This week",
    value: "W",
  },
  {
    label: "This month",
    value: "M",
  },
  {
    label: "This year",
    value: "Y",
  },
  {
    label: "Yesterday",
    value: "LD",
  },
  {
    label: "Previous week",
    value: "LW",
  },
  {
    label: "Previous month",
    value: "LM",
  },
  {
    label: "Previous year",
    value: "LY",
  },
  {
    label: "Last 24  hours",
    value: "HH",
  },
  {
    label: "Last 7 days",
    value: "HW",
  },
  {
    label: "Last 30 days",
    value: "HM",
  },
  {
    label: "Custom",
    value: "C",
  },
];
const SearchForSalesReport = ({ params, setParams }) => {
  const [enableDate, setEnableDate] = useState(true);
  useEffect(() => {
    if (params.period === "C") {
      setEnableDate(false);
      return;
    }
    setEnableDate(true);
  }, [params.period]);
  const onValueChange = (a, values) => {
    let temp_date = { ...params };
    values.period
      ? (temp_date.period = values.period)
      : (temp_date.period = "C");
    if (values.dates) {
      let startDate =
        new Date(
          values?.dates[0]?.$y,
          values?.dates[0]?.$M,
          values?.dates[0]?.$D
        ).getTime() / 1000;
      let endDate =
        new Date(
          values?.dates[1]?.$y,
          values?.dates[1]?.$M,
          values?.dates[1]?.$D
        ).getTime() / 1000;
      // let data = { ...values, start_date: startDate, end_date: endDate };
      temp_date.time_from = startDate;
      temp_date.time_to = endDate;
    } else {
      temp_date.time_from = "";
      temp_date.time_to = "";
    }
    setParams(temp_date);
  };
  return (
    <div className={styles.container}>
      <Card>
        <Form
          layout="vertical"
          className={styles.form}
          name="basic"
          wrapperCol={{}}
          autoComplete="off"
          onValuesChange={onValueChange}
        >
          <div className={styles.search_inputs}>
            <Form.Item label="Period" name="period" style={{ width: "200px" }}>
              <Select
                allowClear
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={PERIOD}
              />
            </Form.Item>
            <Form.Item id="date" label="Select Dates" name="dates">
              <RangePicker disabled={enableDate} />
            </Form.Item>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default SearchForSalesReport;
