import React from "react";
import styles from "./PlanCard.module.css";
const PlanCard = ({selected}) => {
  return (
    <div className={`${styles.plan_card} + ${selected?styles.selected:''}`}>
      <div className="vendor-plans-item  " data-ca-plan-id="7">
        <div className="vendor-plan-content">
          <h3 className="vendor-plan-header">Account plan</h3>

          <span className="vendor-plan-price">Free</span>
          <span className="vendor-plan-price-period">/&nbsp;Month</span>
          <div className="vendor-plan-params">
            <p>
              <strong>Unlimited</strong> products
            </p>
            <p>
              <strong>Unlimited</strong> revenue
            </p>
            <p>Vendor microstore</p>
            <p>
              Transaction fee: <strong> 10%</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanCard;
