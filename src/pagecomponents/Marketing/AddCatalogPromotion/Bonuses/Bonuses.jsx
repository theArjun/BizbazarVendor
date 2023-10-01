import React, { useEffect, useState } from "react";
import styles from './Bonuses.module.css'
import { Button, Form, Select, Input } from "antd";
import BonusesTable from "./Table/BonusesTable";
import data from './data.json'
function Bonuses({bonuses, setBonuses}) {
  const [currentBonus, setCurrentBonus] = useState("");
  const handleBonusSelectChange = (a, b) => {
    setCurrentBonus(b.value);
  };
  // lets create a function to get particular condition UI
  const getBonusByConditionName = (condition) => {
    switch (condition) {
      case "product_discount":
        return (
          <div className={styles.particular_bonus}>
            <Form.Item
              name="discount_bonus"
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
                options={data.bonus_conditions}
              />
            </Form.Item>
            <Form.Item name="discount_value"
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
    let temp=[...bonuses,{...values}]
        setBonuses(temp)
  };
  return (
    <div className={styles.container}>
    <div className={styles.bonus_body}>
      <div className={styles.bonus_body_content}>
        <Form onFinish={onFinish}>
          <div className={styles.add_bonus_field}>
            <div className={styles.bonus_fields}>
              <Form.Item
                className={styles.bonus_field_item}
                name="bonus"
                rules={[
                  {
                    required: true,
                    message: "",
                  },
                ]}
              >
                <Select
                  onChange={handleBonusSelectChange}
                  style={{
                    width: 200,
                  }}
                  options={data.bonus_items}
                />
              </Form.Item>
              <div className={styles.selected_condition_content}>
              {getBonusByConditionName(currentBonus)}
              </div>
            </div>
            <Button htmlType="submit">Add bonus</Button>
          </div>
        </Form>
        <div className={styles.condition_table}>
          <BonusesTable bonuses={bonuses.map((el,i)=>({...el, key:i}))} setBonuses={setBonuses} />
        </div>
      </div>
    </div>
  </div>
  )
}

export default Bonuses;
