import React from "react";
import styles from "./CurrentPlanUsage.module.css";
import { Progress } from "antd";

function CurrentPlanUsage() {
  return (
    <div className={styles.container}>
      <div className="heading-tab" style={{ marginLeft: "10px" }}>
        Current Plan Usage
      </div>
      <div className={styles.projectplan}>
        Plan name: <span>Account Plan 2</span>
      </div>
      <div className={styles.divrow}>
        <div>
          <label className={styles.label1}>products</label>
          <br />
          <div className={styles.label2}>3/ Unlimited</div>
        </div>
        <div className={styles.gauge}>
          {" "}
          <Progress
            percent={50}
            showInfo={false}
            strokeColor={{
              "0%": " #7367f0",
              "100%": " rgba(115, 103, 240, 0.7)",
            }}
            strokeWidth={10}
          />
        </div>
      </div>
      <div className={styles.divrow}>
        <div>
          <label className={styles.label1}>Revenue</label>
          <br />
          <div className={styles.label2}> रु0 /Unlimited</div>
        </div>
        <div className={styles.gauge}>
          <Progress
            percent={90}
            showInfo={false}
            strokeColor={{
              "0%": " #7367f0",
              "100%": " rgba(115, 103, 240, 0.7)",
            }}
            strokeWidth={10}
          />
        </div>
      </div>
    </div>
  );
}

export default CurrentPlanUsage;
