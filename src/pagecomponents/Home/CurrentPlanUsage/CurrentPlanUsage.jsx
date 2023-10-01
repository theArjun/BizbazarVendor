import React from "react";
import styles from "./CurrentPlanUsage.module.css";
import { Progress } from "antd";
import { useGeneralContext } from "../../../ContextProvider/ContextProvider";
import { useNavigate } from "react-router-dom";
function CurrentPlanUsage({ planData, planUsage }) {
  const sellerContext = useGeneralContext();
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className="heading-tab">Current Plan Usage</div>
      <div className={styles.projectplan}>
        Plan name:{" "}
        <span>
          <a
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate("/SellerInformation");
              sellerContext.setPlan({
                type: "ACCOUNT_PLAN",
                value: planData?.plan_id,
              });
            }}
          >
            {planData?.plan}
          </a>
        </span>
      </div>
      <div className={styles.plan_usage_container}>
        {planUsage?.map((el, i) => (
          <div key={i} className={styles.divrow}>
            <div>
              <label className={styles.label1}>{el?.title}</label>
              <br />
              <div className={styles.label2}>
                {el?.current}/{el?.limit === 0 ? "Unlimited" : el?.limit}
              </div>
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
        ))}
      </div>
    </div>
  );
}

export default CurrentPlanUsage;
