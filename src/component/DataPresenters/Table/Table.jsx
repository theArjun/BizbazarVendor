import React from "react";
import styles from "./Table.module.css";
import { Progress } from "antd";
const Table = () => {
  const data = [
    {
      label: "Backordered",
      value: 30,
    },
    {
      label: "Awaiting call",
      value: 4,
    },
    {
      label: "Canceled",
      value: 20,
    },
    {
      label: "Complete",
      value: 10,
    },
    {
      label: "Backordered",
      value: 30,
    },
    {
      label: "Awaiting call",
      value: 4,
    },
    {
      label: "Backordered",
      value: 30,
    },
    {
      label: "Awaiting call",
      value: 4,
    },
    {
      label: "Backordered",
      value: 30,
    },
  ];
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
    <div className={styles.top_fifty_customers_container}>
      <div className={styles.top_fifty_customers_header}>
        <div>Users</div>
        <div>Total</div>
      </div>
      <div className={styles.data_container}>
        {data.map((item, i) => {
          return (
            <div className={styles.single_top_fifty_customers} key={i}>
              <div>
                <div>{`${i + 1}. ${item.label}`}</div>
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
              <div className={styles.progress_value}> {item.value}</div>
            </div>
          );
        })}
      </div>
      <div className={styles.total_value}> Total: {getTotalValue()}</div>
    </div>
  );
};

export default Table;
