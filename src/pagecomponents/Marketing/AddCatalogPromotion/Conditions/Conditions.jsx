import React from "react";
import { Button, Select, Form, Input } from "antd";
import styles from "./Conditions.module.css";
import ConditionTable from "./Table/ConditionTable";
import { useState } from "react";
import data from "./data.json";
function Conditions({
  conditions,
  setConditions,
  setConditionValues,
  conditionValues,
}) {
  const [currentCondition, setCurrentCondition] = useState("");
  const handleTextChange = (a, b) => {
    let temp_condition = { ...conditionValues };
    temp_condition.set = b.value;
    setConditionValues(temp_condition);
  };
  const handleTextValueChange = (a, b) => {
    let temp_condition = { ...conditionValues };
    temp_condition.set_value = b.value;
    setConditionValues(temp_condition);
  };
  // handleCondition select change
  const handleConditionSelectChange = (a, b) => {
    setCurrentCondition(b.value);
  };
  // lets create a function to get particular condition UI
  const getConditionByConditionName = (condition) => {
    switch (condition) {
      case "price":
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
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
              name="product_price_condition_value"
            >
              <Input type="number" />
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
      case "feature":
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
      case "usergroup":
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
      case "subscribed":
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
      case "affiliate_link":
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
      case "reward_points":
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
              <Input type="number" />
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
    console.log(values)
    let data = [...conditions];
    switch (values.condition) {
      case "price":
        data = [
          ...conditions,
          {
            condition: values.condition,
            operator: values.product_price_condition,
            value: values.product_price_condition_value,
          },
        ];
        break;
      case "products":
        data = [
          ...conditions,
          {
            condition: values.condition,
            operator: values.products_condition,
            value: "data",
          },
        ];
        break;
      case "categories":
        data = [
          ...conditions,
          {
            condition: values.condition,
            operator: values.categories_condition,
            value: "data",
          },
        ];
        break;
      case "purchased_products":
        data = [
          ...conditions,
          {
            condition: values.condition,
            operator: values.purchased_products_condition,
            value: "data",
          },
        ];
        break;
      case "users":
        data = [
          ...conditions,
          {
            condition: values.condition,
            operator: values.users_condition,
            value: "data",
          },
        ];
        break;
      case "feature":
        data = [
          ...conditions,
          {
            condition: values.condition,
            operator: values.product_feature_condition,
            value: values.product_feature_variant,
            feature: values.product_feature,
          },
        ];
        break;
      case "usergroup":
        data = [
          ...conditions,
          {
            condition: values.condition,
            operator: values.user_group_condition,
            value: values.user_group,
          },
        ];
        break;
      case "subscribed":
        data = [
          ...conditions,
          {
            condition: values.condition,
            value: values.is_subscribed,
          },
        ];
        break;
      case "affiliate_link":
        data = [
          ...conditions,
          {
            condition: values.condition,
            operator: values.comes_by_affiliate,
            value: "data",
          },
        ];
        break;
      case "reward_points":
        data = [
          ...conditions,
          {
            condition: values.condition,
            operator: values.points_on_user_account_condition,
            value: values.points_on_user_account_value,
          },
        ];
        break;
    }
    setConditions(data);
  };
  return (
    <div className={styles.container}>
      <div className={styles.condition_body}>
        <div className={styles.condition_header}>
          <div className={styles.condition_body_header_text}>
            If{" "}
            <Select
              defaultValue={conditionValues?.set}
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
              defaultValue={conditionValues?.set_value}
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
            <ConditionTable
              conditions={conditions.map((el, i) => ({ ...el, key: i }))}
              setConditions={setConditions}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Conditions;
