import React from "react";
import styles from "./CategoriesSales.module.css";
const data = [
  {
    label: "Accessories",
    value: 20,
  },
  {
    label: "Desktop",
    value: 10,
  },
  {
    label: "Fruits",
    value: 30,
  },
  {
    label: "Clothes",
    value: 4,
  },
];
const CategoriesSales = () => {
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
    <div className={styles.shipping_cost}>
      <div className={styles.shipping_cost_container}>
        <div className={styles.shipping_cost_header}>
          <div>Categories</div>
          <div>Total</div>
        </div>
        {data.map((item, i) => {
          return (
            <div className={styles.single_shipping_cost} key={i}>
              <div>
                <a href="#">{`${item.label}`}</a>
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

export default CategoriesSales;
