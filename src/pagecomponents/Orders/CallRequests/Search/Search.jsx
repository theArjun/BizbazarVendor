import React from "react";
import styles from "./Search.module.css";
import { Card, Form, Input, Button } from "antd";
import { useState } from "react";
import useDebounce from "../../../../utils/Hooks/useDebounce";
const Search = ({ params, setParams }) => {
  const [searchValues, setSearchValues] = useState(params);
  useDebounce(
    () => {
      let temp = { ...params };
      temp.id = searchValues.id || "";
      temp.name = searchValues.name || "";
      temp.phone = searchValues.phone || "";
      setParams(temp);
    },
    500,
    [searchValues]
  );
  const [form] = Form.useForm();
  const onValueChange = (b, values) => {
    let temp = { ...searchValues };
    temp.id = values.id;
    temp.name = values.name;
    temp.phone = values.phone;
    setSearchValues(temp);
  };

  return (
    <div className={styles.container}>
      <Card bordered={true}>
        <Form
          layout="vertical"
          form={form}
          className={styles.form}
          name="basic"
          onValuesChange={onValueChange}
          autoComplete="off"
        >
          <div className={styles.search_inputs}>
            <Form.Item id="id" label="ID" name="id">
              <Input type="text" />
            </Form.Item>
            <Form.Item id="name" label="Name" name="name">
              <Input type="name" />
            </Form.Item>
            <Form.Item id="phone" label="Phone" name="phone">
              <Input type="tel" />
            </Form.Item>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Search;
