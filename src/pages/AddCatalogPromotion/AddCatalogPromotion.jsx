import React, { useEffect, useState } from "react";
import styles from "./AddCatalogPromotion.module.css";
import cx from "classnames";
import {
  CatalogPromotionBonuses,
  CatalogPromotionConditions,
  CatalogPromotionGeneral,
} from "..";
import { Breadcrumb } from "antd";
function AddCatalogPromotion() {
  const [activeTab, setActiveTab] = useState("General");
  const [bonuses, setBonuses] = useState([]);
  const [conditions, setConditions] = useState([]);
  const [generalData, setGeneralData] = useState({
    zone:"",
    name:"",
    detailed_description:"",
    short_description:"",
    from_date:'getDate()',
    to_date: 'getDate()',
    priority: "",
    stop_other_rules:"",
    status:""
  });
  const [conditionValues, setConditionValues] = useState({
    set: "all",
    set_value: 1,
  });
  const getDivision = () => {
    switch (activeTab) {
      case "General":
        return <CatalogPromotionGeneral generalData={generalData} setGeneralData={setGeneralData} />;
      case "Conditions":
        return (
          <CatalogPromotionConditions
            conditions={conditions}
            setConditions={setConditions}
            conditionValues={conditionValues}
            setConditionValues={setConditionValues}
          />
        );

      default:
        return (
          <CatalogPromotionBonuses bonuses={bonuses} setBonuses={setBonuses} />
        );
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
