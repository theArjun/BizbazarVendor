import React from "react";
import styles from "./Search.module.css";
import { Card, Form, Select, DatePicker } from "antd";
const { RangePicker } = DatePicker;
const Search = ({ params, setParams }) => {
  const [form] = Form.useForm();
  const status = [
    { key: "pending", label: "Pending", value: "P" },
    { key: "completed", label: "Completed", value: "C" },
    { key: "declined", label: "Declined", value: "D" },
  ];
  const onValueChange = (a, values) => {
    let temp = { ...params };
    temp.approval_status = values.status || "";
    temp.time_from = "";
    temp.time_to = "";
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
      temp.time_from = startDate;
      temp.time_to = endDate;
    }
    setParams(temp);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };
  return (
    <div className={styles.container}>
      <Card>
        <Form
          layout="vertical"
          form={form}
          className={styles.form}
          name="basic"
          wrapperCol={{}}
          autoComplete="off"
          onValuesChange={onValueChange}
        >
          <div className={styles.search_inputs}>
            <Form.Item
              id="status"
              label="Approval Status"
              name="status"
              style={{ width: "200px" }}
            >
              <Select
                allowClear
                showSearch
                optionFilterProp="children"
                placeholder="Search a status"
                onSearch={onSearch}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={status}
              />
            </Form.Item>
            <Form.Item id="date" label="Select Dates" name="dates">
              <RangePicker />
            </Form.Item>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Search;
