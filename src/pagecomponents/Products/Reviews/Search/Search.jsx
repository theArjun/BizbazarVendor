import React, { useState } from "react";
import styles from "./Search.module.css";
import { Card, Form, Input, Button, Select } from "antd";
import { AiFillStar } from "react-icons/ai";
import "./index.css";
import useDebounce from "../../../../utils/Hooks/useDebounce";
const Search = ({ params, setParams }) => {
  const [values, setValues] = useState({
    name: "",
    rating: "",
    message: "",
    has_images: "",
  });

  useDebounce(
    () => {
      let temp = { ...params };
      temp.name = values.name;
      temp.rating = values.rating;
      temp.message = values.message;
      temp.has_images = values.has_images;
      setParams(temp);
    },
    500,
    [values]
  );
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log("Success:", values);
    // console.log(getAllOrders())
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onValueChange = (a, values) => {
    let temp = { ...values };
    temp.name = values.customer || "";
    temp.rating = values.rating || "";
    temp.message = values.message || "";
    temp.has_images = values.photo || "";
    setValues(temp);
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
          wrapperCol={{}}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div className={styles.search_inputs}>
            <Form.Item id="customer" label="Customer" name="customer">
              <Input type="text" />
            </Form.Item>
            <Form.Item id="message" label="Message" name="message">
              <Input type="text" />
            </Form.Item>
            <Form.Item
              id="rating"
              label="Rating"
              name="rating"
              style={{ width: "130px" }}
            >
              <Select
                allowClear
                placeholder="Select Rating"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={[
                  {
                    value: "5",
                    label: (
                      <span>
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                      </span>
                    ),
                  },
                  {
                    value: "4",
                    label: (
                      <span>
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                      </span>
                    ),
                  },
                  {
                    value: "3",
                    label: (
                      <span>
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                      </span>
                    ),
                  },
                  {
                    value: "2",
                    label: (
                      <span>
                        <AiFillStar />
                        <AiFillStar />
                      </span>
                    ),
                  },
                  {
                    value: "1",
                    label: (
                      <span>
                        <AiFillStar />
                      </span>
                    ),
                  },
                ]}
              />
            </Form.Item>
            <Form.Item
              id="photo"
              label="With photo"
              name="photo"
              style={{ width: "130px" }}
            >
              <Select
                allowClear
                placeholder="With photo"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={[
                  {
                    value: "1",
                    label: "With photo",
                  },
                  {
                    value: "0",
                    label: "Without photo",
                  },
                ]}
              />
            </Form.Item>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Search;
