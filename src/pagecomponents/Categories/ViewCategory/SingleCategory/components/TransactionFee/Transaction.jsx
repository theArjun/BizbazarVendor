import React from "react";
import styles from "./Transaction.module.css";
const Transaction = ({ data }) => {
  return (
    <div className={styles.transaction_fee}>
      <div className={styles.transaction_fee_body}>
        <div
          className={`${styles.transaction_item} ${styles.transaction_header}`}
        >
          <div>
            <h4>Vendor plan</h4>
          </div>
          <div>
            <h4>Percent fee</h4>
          </div>
        </div>
        {data?.vendor_plans?.map((item, i) => {
          return (
            <div key={item?.plan_id} className={`${styles.transaction_item}`}>
              <div>{item?.plan || ""}</div>
              <div>
                {data?.category_fee[parseInt(item?.plan_id)]?.percent_fee ||
                  item?.commission}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Transaction;
