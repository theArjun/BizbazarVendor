import React from "react";
import styles from "./TopTwentyVendors.module.css";
import { Progress } from "antd";
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
const TopTwentyVendors = () => {
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
    <div className={styles.top_twenty_vendors}>
      <div className={styles.top_twenty_vendors_container}>
        <div className={styles.top_twenty_vendors_header}>
          <div>Orders</div>
          <div>Total</div>
        </div>
        <div className={styles.data_container}>
          {data.map((item, i) => {
            return (
              <div className={styles.single_top_twenty_vendors} key={i}>
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
                <div className={styles.progress_value}> रु {item.value}</div>
              </div>
            );
          })}
        </div>
        <div className={styles.total_value}> Total: रु {getTotalValue()}</div>
      </div>
    </div>
  );
};

export default TopTwentyVendors;
