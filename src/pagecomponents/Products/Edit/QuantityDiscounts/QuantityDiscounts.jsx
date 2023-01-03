import React, { useState } from "react";
import styles from "./QuantityDiscount.module.css";
import { Form, Card, Input, Select, Button, Table } from "antd";
import useWindowSize from "../../../../utils/Hooks/useWindowSize";
import { useEffect } from "react";
import { apicall } from "../../../../utils/apicall/apicall";
const userGroup = {
  0: "All",
  1: "Guest",
  2: "Registered user",
};
const QuantityDiscounts = ({id, prices }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [type, setType] = useState("A");
  const windowSize = useWindowSize();
  const onFinish = (values) => {
    const req_data = {prices:[prices.concat(values)]}
    console.log(req_data);
    // setData([...data, values])
    // call method to update12
    // updateDiscount(id, req_data);
  };

  useEffect(() => {
    const result = Object.values(prices).map((item, i) => ({
      ...item,
      type: item.percentage_discount == "0" ? "Absolute" : "Percentage",
      user_group: userGroup[item.usergroup_id],
    }));
    setData(result);
  }, []);

  // Update Quantity discount
  const updateDiscount = async (id, values) => {
    const result = await apicall({
      url: `products/${id}`,
      method: "put",
      data: values,
    });
    if (result.data) {
      console.log(result.data);
    }
  };
  const onValueChange = (a, values) => {
    if (values.price_type) {
      setType("P");
    }
  };
  const columns = [
    {
      title: "Quantity",
      dataIndex: "lower_limit",
      key: "product",
    },
    {
      title: "Value",
      dataIndex: "price",
      key: "price",
      render: (text, row) => (
        <div>
          {row?.percentage_discount == "0"
            ? row.price
            : row.percentage_discount + "%"}
        </div>
      ),
    },
    {
      title: "Discount amount",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "amount",
    },
    {
      title: "User Group",
      key: "action",
      dataIndex: "user_group",
    },
  ];
  return (
    <div className={styles.quantity_discount}>
      <Card>
        <Form
          name="basic"
          layout="vertical"
          initialValues={{
            price_type: "A",
            usergroup_id: "0",
          }}
          onFinish={onFinish}
          autoComplete="off"
          onValuesChange={onValueChange}
        >
          <div className={styles.discount_container}>
            <div className={styles.discount_container_left}>
              <Form.Item
                label="Quantity"
                name="lower_limit"
                style={{ width: "80px" }}
                rules={[
                    {
                      required: true,
                      message:''
                     
                    },
                  ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Value"
                name={type == "A" ? "price" : "percentage_discount"}
                rules={[
                    {
                      required: true,
                      message:''
                    },
                  ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Type"
                name="price_type"
                style={{ width: "200px" }}
              >
                <Select
                  showArrow
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={[
                    { value: "A", label: "Absolute(रु)" },
                    { value: "P", label: "Percent(%)" },
                  ]}
                />
              </Form.Item>
              <Form.Item
                label="User group"
                name="usergroup_id"
                style={{ width: "200px" }}
              >
                <Select
                  showArrow
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={[
                    { value: "0", label: "All" },
                    { value: "1", label: "Guest" },
                    { value: "2", label: "Registered user" },
                  ]}
                />
              </Form.Item>
            </div>
            <div className={styles.discount_container_right}>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
              </Form.Item>
            </div>
          </div>
        </Form>
      </Card>
      <Table
        id="product"
        loading={loading}
        columns={columns}
        dataSource={data}
        pagination={false}
        scroll={{
          y: windowSize.height > 670 ? 300 : 200,
          x: 1000,
        }}
      />
    </div>
  );
};
export default QuantityDiscounts;
