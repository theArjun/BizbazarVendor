import React,{useState} from "react";
import styles from "./Plan.module.css";
import PlanCard from "./PlanCard/PlanCard";
const Plan = ({plans, sellerData, changed, setChanged}) => {
  return (
    <div className={styles.plan}>
      <div className={styles.plan_title}></div>
      <div className={styles.plan_body}>
      {
        plans.map((plan,i)=>{
          return  <PlanCard selected={sellerData?.plan_id===plan?.plan_id} setChanged={setChanged} changed={changed===plan?.plan_id} key={i} plan={plan}/>
        })
      }
      </div>
    </div>
  );
};

export default Plan;
