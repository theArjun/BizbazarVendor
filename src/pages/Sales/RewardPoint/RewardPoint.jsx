import React, { useState } from "react";
import styles from "./RewardPoint.module.css";
import { Breadcrumb } from "antd";
import { SearchForSalesReport } from "../..";
const INITIAL_PARAMS = {
  period: "C",
  time_from: "",
  time_to: "",
};
const RewardPoint = () => {
  const [params, setParams] = useState(INITIAL_PARAMS);
  return (
    <div className={styles.reward_point_container}>
      <div className="breadcrumb">
        <Breadcrumb>
          <Breadcrumb.Item>Sales</Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="">Reward Point</a>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <SearchForSalesReport params={params} setParams={setParams} />
      <div>Reward point container</div>
    </div>
  );
};

export default RewardPoint;
