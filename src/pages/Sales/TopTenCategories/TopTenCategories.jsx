import React, { useState } from "react";
import styles from "./TopTenCategories.module.css";
import { Breadcrumb } from "antd";
import cx from "classnames";
import {
  TopTenCategoriesCost,
  TopTenCategoriesItemSold,
  TopTenCategoriesItemSoldTable,
  TopTenCategoriesCostTable,
  TopTwentyVendors,
  SearchForSalesReport,
} from "../..";
import { Link } from "react-router-dom";
const tabs = [
  "Top 20 Vendors",
  "Top 10 Categories - Items Sold",
  "Top 10 Categories - Cost",
  "Top 10 Categories - Items Sold (table)",
  "Top 10 Categories - Cost (table)",
];
const INITIAL_PARAMS = {
  period: "C",
  time_from: "",
  time_to: "",
};
const TopTenCategories = () => {
  const [params, setParams] = useState(INITIAL_PARAMS);
  const [active, setActive] = useState(tabs[0]);
  //Getting tab content
  const getContainerFromTab = () => {
    switch (active) {
      case tabs[1]:
        return <TopTenCategoriesItemSold />;
      case tabs[2]:
        return <TopTenCategoriesCost />;
      case tabs[3]:
        return <TopTenCategoriesItemSoldTable />;
      case tabs[4]:
        return <TopTenCategoriesCostTable />;
      default:
        return <TopTwentyVendors />;
    }
  };
  return (
    <div className={styles.top_ten_categories_container}>
      <div className="breadcrumb">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Sales</Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/Sales/Top 10 Categories">Top 10 Categories</Link>
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

export default TopTenCategories;
