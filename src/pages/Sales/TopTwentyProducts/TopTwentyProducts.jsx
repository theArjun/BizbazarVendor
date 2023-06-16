import React, { useState } from "react";
import styles from "./TopTwentyProducts.module.css";
import { Breadcrumb } from "antd";
import cx from "classnames";
import {
  SearchForSalesReport,
  TopTwentyProductsCost,
  TopTwentyProductsCostTable,
  TopTwentyProductsItemSold,
  TopTwentyProductsItemSoldTable,
} from "../..";
import { Link } from "react-router-dom";
const tabs = [
  "Top 20 Products - Items Sold",
  "Top 20 Products - Cost",
  "Top 20 Products - Cost (table)",
  "Top 20 Products - Items Sold (table)",
];
const INITIAL_PARAMS = {
  period: "C",
  time_from: "",
  time_to: "",
};
const TopTwentyProducts = () => {
  const [params, setParams] = useState(INITIAL_PARAMS);
  const [active, setActive] = useState(tabs[0]);
  //Getting tab content
  const getContainerFromTab = () => {
    switch (active) {
      case tabs[1]:
        return <TopTwentyProductsCost />;
      case tabs[2]:
        return <TopTwentyProductsCostTable />;
      case tabs[3]:
        return <TopTwentyProductsItemSoldTable />;
      default:
        return <TopTwentyProductsItemSold />;
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
            <Link to="/Sales/Top 20 Products">Top 20 Products</Link>
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

export default TopTwentyProducts;
