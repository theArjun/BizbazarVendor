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
import { SearchForSalesReport } from "../..";
import { Link } from "react-router-dom";
const tabs = [
  "Products sales - Cost (table)",
  "Categories sales - Cost (table)",
  "Most active customer locations",
  "Shipping cost per order",
  "Order statuses",
];
const INITIAL_PARAMS = {
  period: "C",
  time_from: "",
  time_to: "",
};
const OrderReports = () => {
  const [params, setParams] = useState(INITIAL_PARAMS);
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
          <Breadcrumb.Item>
            <Link to="/">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Sales</Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/Sales/Order Reports">Order Reports</Link>
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

export default OrderReports;
