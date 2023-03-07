import React from "react";
import styles from "./Plan.module.css";
import PlanCard from "./PlanCard/PlanCard";
const Plan = () => {
  return (
    <div className={styles.plan}>
      <div className={styles.plan_title}></div>
      <div className={styles.plan_body}>
        <PlanCard selected={true} />
        <PlanCard />
        <PlanCard />
        <PlanCard />
        <PlanCard />
        <PlanCard />
      </div>
    </div>
  );
};

export default Plan;
