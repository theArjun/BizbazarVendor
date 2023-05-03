import React, { useState } from "react";
import styles from "./TopFiftyCustomers.module.css";
import { Breadcrumb } from "antd";
import cx from "classnames";
import {
  TopFiftyCustomersOrderSales,
  TopFiftyCustomersNoOfOrders,
} from "../..";
const tabs = [
  "Top 50 Customers- Order Sales",
  "Top 50 Customers - No. of Orders",
];
const TopFiftyCustomers = () => {
  const [active, setActive] = useState(tabs[0]);
  const getContainerFromTab = () => {
    switch (active) {
      case tabs[1]:
        return <TopFiftyCustomersNoOfOrders />;
      default:
        return <TopFiftyCustomersOrderSales />;
    }
  };
  return (
    <div className={styles.top_fifty_customers_container}>
      <div className="breadcrumb">
        <Breadcrumb>
          <Breadcrumb.Item>Sales</Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="">Order Reports</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{active}</Breadcrumb.Item>
        </Breadcrumb>
      </div>
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

export default TopFiftyCustomers;
