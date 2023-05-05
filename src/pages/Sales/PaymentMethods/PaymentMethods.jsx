import React, { useState } from "react";
import styles from "./PaymentMethods.module.css";
import cx from "classnames";
import {
  PaymentMethodsChartOrdersPlaced,
  PaymentMethodsChartCost,
  SearchForSalesReport,
} from "../..";
import { Breadcrumb } from "antd";
const tabs = [
  "Payment methods chart - Orders placed",
  "Payment methods chart - Cost",
];
const INITIAL_PARAMS = {
  period: "C",
  time_from: "",
  time_to: "",
};
const PaymentMethods = () => {
  const [params, setParams] = useState(INITIAL_PARAMS);
  const [active, setActive] = useState(tabs[0]);
  //Getting tab content
  const getContainerFromTab = () => {
    switch (active) {
      case tabs[1]:
        return <PaymentMethodsChartCost />;
      default:
        return <PaymentMethodsChartOrdersPlaced />;
    }
  };
  return (
    <div className={styles.top_ten_categories_container}>
      <div className="breadcrumb">
        <Breadcrumb>
          <Breadcrumb.Item>Sales</Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="">Top 20 Products</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{active}</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <SearchForSalesReport params={params} setParams={setParams} />
      <div className={styles.tabContainer}>
        <div className={styles.left}>
          {tabs.map((dat, i) => (
            <div
              className={cx(
                styles.button,
                active === dat ? styles.bgColor : null
              )}
              key={i}
              onClick={() => setActive(dat)}
            >
              {dat}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.tab_content_body}>
        <div>{getContainerFromTab()}</div>
      </div>
    </div>
  );
};

export default PaymentMethods;
