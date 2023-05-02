import React, { useState } from "react";
import cx from "classnames";
import styles from "./OrderReports.module.css";
import { Breadcrumb } from "antd";
import {
  ProductsSales,
  CategoriesSales,
  MostActiveCustomers,
  ShippingCostPerOrder,
  OrderStatuses,
} from "../..";
const tabs = [
  "Products sales - Cost (table)",
  "Categories sales - Cost (table)",
  "Most active customer locations",
  "Shipping cost per order",
  "Order statuses",
];

const OrderReports = () => {
  const [active, setActive] = useState(tabs[0]);
  const getContainerFromTab = () => {
    switch (active) {
      case tabs[1]:
        return <CategoriesSales />;
      case tabs[2]:
        return <MostActiveCustomers />;
      case tabs[3]:
        return <ShippingCostPerOrder />;
      case tabs[4]:
        return <OrderStatuses />;
      default:
        return <ProductsSales />;
    }
  };
  return (
    <div className={styles.order_report_container}>
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

export default OrderReports;
