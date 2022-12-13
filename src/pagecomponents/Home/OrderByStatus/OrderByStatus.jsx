import React, { useState, useEffect } from "react";

import styles from "./OrderByStatus.module.css";

function OrderByStatus({ order, status }) {
  console.log(order);

  const getOrderByStatus = (datum) => {
    const filterDatabyStatus = order.filter(
      (dat, i) => dat.status === datum.status
    );

    const quantity = filterDatabyStatus?.length;

    const total = filterDatabyStatus.reduce(
      (init, dat) => init + parseInt(dat.total),
      0
    );

    console.log(total);

    return {
      qty: quantity,
      total: total,
    };
  };

  return (
    <div className={styles.container}>
      <div className="heading-tab" style={{ marginLeft: "10px" }}>
        Order By Status
      </div>
      <div style={{ marginTop: "10px" }} />
      <table className={styles.table}>
        <tr className={styles.tr}>
          <th className={styles.th}>STATUS</th>
          <th className={styles.th}>QTY</th>
          <th className={styles.th}>TOTAL</th>
          <th className={styles.th}>SHIPPING</th>
        </tr>

        {status.map((dat, i) => (
          <tr key={i} className={styles.tr1}>
            <td className={styles.th}>{dat.description}</td>
            <td className={styles.th}>{getOrderByStatus(dat)?.qty}</td>
            <td className={styles.th}> रु{getOrderByStatus(dat)?.total}</td>
            <td className={styles.th}> रु10</td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default OrderByStatus;
