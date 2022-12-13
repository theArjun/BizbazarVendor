import React from "react";
import styles from "./RightContain.module.css";

function RightContain({ orderDetail }) {
  console.log(orderDetail);
  return (
    <div className={styles.container}>
      <div>
        {" "}
        <lable className={styles.label}>Status</lable> {orderDetail.status}
      </div>
      <div>
        {" "}
        <lable className={styles.label}>Settlements</lable> Unsettled
      </div>
      <div>
        {" "}
        <lable className={styles.label}>Payment information</lable>
      </div>
      <div>
        {" "}
        Method {orderDetail?.payment_method?.payment}{" "}
        {orderDetail?.payment_method?.description}
      </div>
      <div>
        {" "}
        <lable className={styles.label}>Manager</lable>
      </div>
      <div>
        {orderDetail?.issuer_data?.firstname}{" "}
        {orderDetail?.issuer_data?.lastname}{" "}
      </div>
      <div>
        {" "}
        <lable className={styles.label}>Shipping information</lable>
      </div>
      {orderDetail?.shipping?.map((dat, i) => (
        <>
          <div>{dat?.group_name}</div>
          <div>Method : {dat?.shipping}</div>
        </>
      ))}
    </div>
  );
}

export default RightContain;
