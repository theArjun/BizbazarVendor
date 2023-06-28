import { useState } from "react";
import { SalesContent, SalesTabs, SearchForSalesReport } from "../..";
import styles from "./SalesReport.module.css";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
const INITIAL_PARAMS = {
  period: "C",
  time_from: "",
  time_to: "",
};
const tabs = [
  "Order Reports",
  "Reward Point",
  "Product distribution on category",
  "Top 50 customers",
  "Top 10 customers",
  "Payment Methods",
];
const contentTabs = {
  "Order Reports": {
    tabs: [
      "Product sales",
      "Categories sales",
      "Most active customer locations",
      "Shipping cost per order ",
      "Order status",
    ],
    data: {},
  },
  "Reward Point": {
    tabs: ["Product sales", "Categories sales"],
    data: {},
  },
  "Product distribution on category": {
    tabs: ["Product sales"],
    data: {},
  },
  "Top 50 customers": {
    tabs: [
      "Most active customer locations",
      "Shipping cost per order ",
      "Order status",
    ],
    data: {},
  },
  "Top 10 customers": {
    tabs: ["Apple Actegi "],
    data: {},
  },
  "Payment Methods": {
    tabs: [],
    data: {},
  },
};
const SalesReport = () => {
  const [params, setParams] = useState(INITIAL_PARAMS);
  const [active, setActive] = useState(tabs[0]);
  const [sideBar, setSideBar] = useState(false);
  return (
    <div className={styles.sales_report}>
      <div className={styles.breadcrumb}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Orders</Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/Orders/Sales Report">Sales Report</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{active}</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className={styles.sales_report_wrapper}>
        <div className={styles.sales_report_left}>
          <SalesContent tabs={contentTabs[active].tabs} />
        </div>
        <div
          className={`${styles.tabs_wrapper}  ${
            sideBar && styles.open_tabs_wrapper
          }`}
        >
          <div
            onClick={() => setSideBar(!sideBar)}
            className={`${styles.toggle_side_bar} ${
              sideBar ? styles.open_toggle_btn : ""
            }`}
          >
            {!sideBar ? (
              <AiOutlineDoubleLeft size={25} />
            ) : (
              <AiOutlineDoubleRight size={25} />
            )}
          </div>
          <div className={styles.tabs}>
            <SalesTabs active={active} setActive={setActive} tabs={tabs} />
          </div>
          <SearchForSalesReport params={params} setParams={setParams} />
        </div>
      </div>
    </div>
  );
};

export default SalesReport;
