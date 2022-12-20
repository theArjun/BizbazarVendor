import React, { useState } from "react";
import styles from "./AddCatalogPromotion.module.css";
import cx from "classnames";
import General from "../../pagecomponents/Marketing/AddCatalogPromotion/General/General";
import Conditions from "../../pagecomponents/Marketing/AddCatalogPromotion/Conditions/Conditions";
import Bonuses from "../../pagecomponents/Marketing/AddCatalogPromotion/Bonuses/Bonuses";

function AddCatalogPromotion() {
  const [activeTab, setActiveTab] = useState("General");

  const getDivision = () => {
    switch (activeTab) {
      case "General":
        return <General />;
      case "Conditions":
        return <Conditions />;

      default:
        return <Bonuses />;
    }
  };

  return (
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
  );
}

export default AddCatalogPromotion;
