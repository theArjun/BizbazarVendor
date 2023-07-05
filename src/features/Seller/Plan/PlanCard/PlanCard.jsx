import React from "react";
import styles from "./PlanCard.module.css";
const PlanCard = ({ selected, plan, changed, setChanged }) => {
  return (
    <div
      className={`${styles.plan_card} + ${selected ? styles.selected : ""} + ${
        changed ? styles.changed : ""
      }`}
      onClick={() => setChanged(plan?.plan_id)}
    >
      <div className="vendor-plans-item  " data-ca-plan-id="7">
        <div className={styles.vendor_plan_content}>
          <h3 className="vendor-plan-header">{plan?.plan}</h3>

          <span className="vendor-plan-price">
            {plan?.price === "0.00" ? "Free" : "रु" + plan?.price}
          </span>
          <span className="vendor-plan-price-period">
            /&nbsp;{plan?.periodicity}
          </span>
          <div></div>
          <div className="vendor-plan-params">
            <p>
              {plan?.products_limit === "0"
                ? "Unlimited products"
                : Math.floor(plan?.products_limit) + " products"}
            </p>
            <p>
              {plan?.revenue_limit === "0.00"
                ? "Unlimited revenue"
                : Math.floor(plan?.revenue_limit) + " revenue"}
            </p>
            <p>Vendor microstore</p>
            <p>
              Transaction fee: <strong> {Math.floor(plan?.commission)}%</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanCard;
