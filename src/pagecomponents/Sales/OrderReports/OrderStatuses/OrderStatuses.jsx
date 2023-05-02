import React from "react";
import styles from "./OrderStatuses.module.css";
import { Progress } from "antd";
const data = [
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
const OrderStatuses = () => {
  return (
    <div className={styles.order_statuses}>
      <div className={styles.order_statuses_container}>
        <div className={styles.status_header}>
          <div>Statuses of order</div>
          <div>Total</div>
        </div>
        {data.map((item, i) => {
          return (
            <div className={styles.single_status} key={i}>
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
              <div className={styles.progress_value}>{item.value}</div>
            </div>
          );
        })}
        <div className={styles.total_value}> Total: {getTotalValue()}</div>
      </div>
    </div>
  );
};

export default OrderStatuses;
