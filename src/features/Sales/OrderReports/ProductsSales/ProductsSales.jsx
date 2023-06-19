import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ProductsSales.module.css";
const data = [
  {
    label: "1344",
    value: 20,
  },
  {
    label: "9863",
    value: 10,
  },
  {
    label: "4245",
    value: 30,
  },
  {
    label: "8437",
    value: 4,
  },
  {
    label: "661344",
    value: 330,
  },
  {
    label: "5696",
    value: 1050,
  },
  {
    label: "5665",
    value: 630,
  },
  {
    label: "5656",
    value: 4,
  },
];
const ProductsSales = () => {
  const navigate = useNavigate();
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
          <div>Orders</div>
          <div>Total</div>
        </div>
        {data.map((item, i) => {
          return (
            <div className={styles.single_shipping_cost} key={i}>
              <div>
                <a
                  href="#"
                  onClick={() =>
                    navigate(`../Orders/orders details/${item.label}`)
                  }
                >{`${i + 1}. Order #${item.label}`}</a>
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

export default ProductsSales;
