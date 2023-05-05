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
} from "../..";
const tabs = [
  "Top 20 Vendors",
  "Top 10 Categories - Items Sold",
  "Top 10 Categories - Cost",
  "Top 10 Categories - Items Sold (table)",
  "Top 10 Categories - Cost (table)",
];
const TopTenCategories = () => {
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
          <Breadcrumb.Item>Sales</Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="">Top 10 Categories</a>
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

export default TopTenCategories;
