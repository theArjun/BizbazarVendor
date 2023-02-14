import React, { useState } from "react";
import styles from "./AddCatalogPromotion.module.css";
import cx from "classnames";
import { CatalogPromotionBonuses, CatalogPromotionConditions, CatalogPromotionGeneral } from "..";
import { Breadcrumb } from "antd"; 
function AddCatalogPromotion() {
  const [activeTab, setActiveTab] = useState("General");

  const getDivision = () => {
    switch (activeTab) {
      case "General":
        return <CatalogPromotionGeneral />;
      case "Conditions":
        return <CatalogPromotionConditions />;

      default:
        return <CatalogPromotionBonuses />;
    }
  };

  return (
    <React.Fragment>
    <div className={styles.breadcumb}>
      <Breadcrumb>
        <Breadcrumb.Item>Marketing</Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="">Add Catalog Promotion</a>
        </Breadcrumb.Item>
      </Breadcrumb>
    </div>
    <div className={styles.container}>
      <div className={styles.tabWrapper}>
        {["General", "Conditions", "Bonuses"].map((dat, i) => (
          <div
            className={cx(
              styles.tab,
              dat === activeTab ? styles.bgColor : null
            )}
            key={i}
            onClick={() => setActiveTab(dat)}
          >
            {dat}
          </div>
        ))}
      </div>
      <div className={styles.tabcontain}>{getDivision()}</div>
    </div>
    </React.Fragment>
  );
}

export default AddCatalogPromotion;
