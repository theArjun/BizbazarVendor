import React from "react";
import styles from "./Search.module.css";
import { Card,Form,Select,Input, DatePicker } from "antd";
const {RangePicker}=DatePicker;
const Search = () => {
    const [form]=Form.useForm()
  const types = [
    { key: "all", label: "All", value: "all" },
    { key: "other", label: "Other", value: "other" },
    { key: "placed", label: "Order placed", value: "placed" },
    { key: "changed", label: "Order changed", value: "changed" },
    { key: "refunded", label: "Order refunded", value: "refunded" },
    { key: "payout", label: "Payout", value: "payout" },
  ];
  const status = [
    { key: "all", label: "All", value: "all" },
    { key: "pending", label: "Pending", value: "pending" },
    { key: "completed", label: "Completed", value: "completed" },
    { key: "declined", label: "Declined", value: "declined" },
  ];
  const onValueChange = (a, values) => {
    console.log(values);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };
  return (
    <div className={styles.container}>
      <Card >
        <Form
          layout="vertical"
          form={form}
          className={styles.form}
          name="basic"
          wrapperCol={{}}
          autoComplete="off"
          onValuesChange={onValueChange}
          initialValues={
            {
                types:types[0].value,
                status:status[0].value
            }
          }
        >
          <div className={styles.search_inputs}>
            <Form.Item id="req" label="Type" name="types"
            style={{width:'200px'}}
            >
              <Select
                showSearch
                placeholder="Select a type"
                optionFilterProp="children"
                onSearch={onSearch}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={types}
              />
            </Form.Item>
            <Form.Item id="status" 
            label="Approval Status" 
            name="status"
            style={{width:'200px'}}>
              <Select
                showSearch
                optionFilterProp="children"
                onSearch={onSearch}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={status}
              />
            </Form.Item> 
            <Form.Item id="date" 
            label="Select Dates" 
            name="dates">
            <RangePicker/>
            </Form.Item>
           
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Search;
