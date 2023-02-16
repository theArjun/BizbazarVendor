import React, { useEffect } from "react";
import { Button, Select, Form, Input } from "antd";
import styles from "./Conditions.module.css";
import ConditionTable from "./Table/ConditionTable";
import { useState } from "react";
import data from "./data.json";
function Conditions({ conditions, setConditions }) {
  const [currentCondition, setCurrentCondition] = useState("");
  const [conditionData, setConditionData]=useState([])
  // set table data 
  useEffect(()=>{
    setConditionData(Object.values(conditions.conditions.conditions))
  },[conditions])
  const handleTextChange = (a, b) => {
    let temp_condition = { ...conditions };
    temp_condition.conditions.set = b.value;
    setConditions(temp_condition);
  };
  const handleTextValueChange = (a, b) => {
    let temp_condition = { ...conditions };
    temp_condition.conditions.set_value = b.value;
    setConditions(temp_condition);
  };
  // handleCondition select change
  const handleConditionSelectChange = (a, b) => {
    setCurrentCondition(b.value);
  };
  // lets create a function to get particular condition UI
  const getConditionByConditionName = (condition) => {
    switch (condition) {
      case "product_price":
        return (
          <div className={styles.particular_condition}>
            <Form.Item
              name="product_price_condition"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Select
                style={{
                  width: 200,
                }}
                options={data.product_price}
              />
            </Form.Item>
            <Form.Item name="product_price_condition_value">
              <Input />
            </Form.Item>
          </div>
        );
      case "products":
        return (
          <div className={styles.particular_condition}>
            <Form.Item
              name="products_condition"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Select
                style={{
                  width: 200,
                }}
                options={data.categories}
              />
            </Form.Item>
            <Button type="primary">Add products</Button>
          </div>
        );
      case "purchased_products":
        return (
          <div className={styles.particular_condition}>
            <Form.Item
              name="purchased_products_condition"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Select
                style={{
                  width: 200,
                }}
                options={data.categories}
              />
            </Form.Item>
            <Button type="primary">Add products</Button>
          </div>
        );
      case "users":
        return (
          <div className={styles.particular_condition}>
            <Form.Item
              name="users_condition"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Select
                style={{
                  width: 200,
                }}
                options={data.categories}
              />
            </Form.Item>
            <Button type="primary">Add users</Button>
          </div>
        );
      case "product_feature":
        return (
          <div className={styles.particular_condition}>
            <Form.Item
              name="product_feature"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Select
                style={{
                  width: 200,
                }}
                options={data.categories}
              />
            </Form.Item>
            <Form.Item
              name="product_feature_condition"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Select
                style={{
                  width: 200,
                }}
                options={data.product_features}
              />
            </Form.Item>
            <Form.Item
              name="product_feature_variant"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Select
                style={{
                  width: 200,
                }}
                options={data.categories}
              />
            </Form.Item>
          </div>
        );
      case "categories":
        return (
          <div className={styles.particular_condition}>
            <Form.Item
              name="categories_condition"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Select
                style={{
                  width: 200,
                }}
                options={data.categories}
              />
            </Form.Item>
            <Button type="primary">Add categories</Button>
          </div>
        );
      case "user_group":
        return (
          <div className={styles.particular_condition}>
            <Form.Item
              name="user_group_condition"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Select
                style={{
                  width: 200,
                }}
                options={data.user_group_condition}
              />
            </Form.Item>
            <Form.Item
              name="user_group"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Select
                style={{
                  width: 200,
                }}
                options={data.user_group}
              />
            </Form.Item>
          </div>
        );
      case "is_subscribed":
        return (
          <div className={styles.particular_condition}>
            <Form.Item
              name="is_subscribed"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Select
                style={{
                  width: 200,
                }}
                options={data.is_subscribed}
              />
            </Form.Item>
          </div>
        );
      case "comes_by_affiliate":
        return (
          <div className={styles.particular_condition}>
            <Form.Item
              name="comes_by_affiliate"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Select
                style={{
                  width: 200,
                }}
                options={data.categories}
              />
            </Form.Item>
            <Button type="primary">Add plan</Button>
          </div>
        );
      case "points_on_user_account":
        return (
          <div className={styles.particular_condition}>
            <Form.Item
              name="points_on_user_account_condition"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Select
                style={{
                  width: 200,
                }}
                options={data.points_on_user_account}
              />
            </Form.Item>
            <Form.Item
              name="points_on_user_account_value"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </div>
        );
      default:
        return (
          <div className={styles.particular_condition}>
            {" "}
            No condition is selected{" "}
          </div>
        );
    }
  };

  // form submit function
  const onFinish = (values) => {
    let temp={...conditions}
        temp.conditions.conditions[conditions.count]={
          condition:values.condition,
          operator:values.product_price_condition,
          values:values.product_price_condition_value
        }
        temp.count=temp.count+1;
        setConditions(temp)
  };
  return (
    <div className={styles.container}>
      <div className={styles.condition_body}>
        <div className={styles.condition_header}>
          <div className={styles.condition_body_header_text}>
            If{" "}
            <Select
              defaultValue="all"
              onChange={handleTextChange}
              style={{
                width: 70,
              }}
              bordered={false}
              options={[
                {
                  value: "all",
                  label: "all",
                },
                {
                  value: "any",
                  label: "any",
                },
              ]}
            />{" "}
            of these conditions are{" "}
            <Select
              defaultValue="true"
              onChange={handleTextValueChange}
              style={{
                width: 80,
              }}
              bordered={false}
              options={[
                {
                  value: 1,
                  label: "true",
                },
                {
                  value: 0,
                  label: "false",
                },
              ]}
            />
          </div>
        </div>
        <div className={styles.condition_body_content}>
          <Form onFinish={onFinish}>
            <div className={styles.add_condition_field}>
              <div className={styles.condition_fields}>
                <Form.Item
                  className={styles.condition_field_item}
                  name="condition"
                  rules={[
                    {
                      required: true,
                      message: "",
                    },
                  ]}
                >
                  <Select
                    onChange={handleConditionSelectChange}
                    style={{
                      width: 200,
                    }}
                    options={data.condition_items}
                  />
                </Form.Item>
                <div className={styles.selected_condition_content}>
                  {getConditionByConditionName(currentCondition)}
                </div>
              </div>
              <Button htmlType="submit">Add condition</Button>
            </div>
          </Form>
          <div className={styles.condition_table}>
            <ConditionTable conditions={conditionData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Conditions;
