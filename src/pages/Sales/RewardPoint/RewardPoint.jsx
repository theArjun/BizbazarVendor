import React, { useState } from "react";
import styles from "./RewardPoint.module.css";
import { Breadcrumb } from "antd";
import { SearchForSalesReport } from "../..";
import { Link } from "react-router-dom";
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
          <Breadcrumb.Item>
            <Link to="/">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Sales</Breadcrumb.Item>
          <Breadcrumb.Item>Reward Point</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <SearchForSalesReport params={params} setParams={setParams} />
      <div>Reward point container</div>
    </div>
  );
};

export default RewardPoint;
