import React, { useState } from "react";
import styles from "./TopTwentyProducts.module.css";
import { Breadcrumb } from "antd";
import cx from "classnames";
import {
  TopTwentyProductsCost,
  TopTwentyProductsCostTable,
  TopTwentyProductsItemSold,
  TopTwentyProductsItemSoldTable,
} from "../..";
const tabs = [
  "Top 10 Products - Items Sold",
  "Top 10 Products - Cost",
  "Top 10 Products - Cost (table)",
  "Top 10 Products - Items Sold (table)",
];
const TopTwentyProducts = () => {
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
          <Breadcrumb.Item>Sales</Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="">Top 20 Products</a>
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

export default TopTwentyProducts;
