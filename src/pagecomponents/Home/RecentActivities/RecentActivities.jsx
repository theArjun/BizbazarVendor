import { Steps } from "antd";
import React from "react";
import styles from "./RecentActivities.module.css";

function RecentActivities() {
  const array = [
    {
      title: "Products (update): Acc product (#496)",
      time: "28.11.2022, 10:57",
    },
    {
      title: "Products (update): Acc product (#496)",
      time: "28.11.2022, 10:57",
    },
    {
      title: "Products (update): Acc product (#496)",
      time: "28.11.2022, 10:57",
    },
    {
      title: "Products (update): Acc product (#496)",
      time: "28.11.2022, 10:57",
    },
    {
      title: "Products (update): Acc product (#496)",
      time: "28.11.2022, 10:57",
    },
    {
      title: "Products (update): Acc product (#496)",
      time: "28.11.2022, 10:57",
    },
    {
      title: "Products (update): Acc product (#496)",
      time: "28.11.2022, 10:57",
    },
    {
      title: "Products (update): Acc product (#496)",
      time: "28.11.2022, 10:57",
    },
  ];

  return (
    <div className={styles.container}>
      <div className="heading-tab" style={{ marginLeft: "10px" }}>
        Recent Activities
      </div>
      <div className={styles.stepContainer}>
        {array.map((dat, i) => (
          <div className={styles.wrapStep} key={i}>
            <div>{dat.title}</div>
            <div>{dat.time}</div>
            <div className={styles.hr} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentActivities;
