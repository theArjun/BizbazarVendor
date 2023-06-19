import React from "react";
import { Progress } from "antd";
import styles from "./MostActiveCustomers.module.css";
const data = [
  {
    label: "Bagmati",
    value: 2055,
  },
  {
    label: "Province 1",
    value: 15660,
  },
  {
    label: "Province 2",
    value: 3560,
  },
  {
    label: "Lumbini",
    value: 455,
  },
];
const MostActiveCustomers = () => {
  // Getting percentage  for each order status
  const getPercentage = (value = 0) => {
    let values = data.reduce((accumulator, currentValue) => {
      accumulator.push(parseInt(currentValue.value));
      return accumulator;
    }, []);
    return ((value / Math.max(...values)) * 100).toFixed(2);
  };
  // Getting total
  const getTotalValue = () => {
    let total = data.reduce((accumulator, currentValue) => {
      accumulator = accumulator + currentValue.value;
      return accumulator;
    }, 0);
    return total;
  };
  return (
    <div className={styles.active_customers}>
      <div className={styles.active_customers_container}>
        <div className={styles.active_customers_header}>
          <div>Rate areas</div>
          <div>Total</div>
        </div>
        {data.map((item, i) => {
          return (
            <div className={styles.single_active_customer} key={i}>
              <div>
                <div>{item.label}</div>
                <div>
                  <Progress
                    percent={getPercentage(item.value)}
                    showInfo={false}
                    strokeColor={{
                      "0%": "#108ee9",
                      "100%": "#87d068",
                    }}
                  />
                </div>
              </div>
              <div className={styles.progress_value}> रु {item.value}</div>
            </div>
          );
        })}
        <div className={styles.total_value}> Total: रु {getTotalValue()}</div>
      </div>
    </div>
  );
};

export default MostActiveCustomers;
