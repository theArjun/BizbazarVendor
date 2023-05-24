import React, { useState } from "react";
import cx from "classnames";
import styles from "./SingleCategory.module.css";
import General from "./components/General/General";
const tabs = ["General", "Add-ons", "Appearance", "Transaction Fee"];
const SingleCategory = ({ data }) => {
  const [active, setActive] = useState("General");
  const getContainerFromTab = () => {
    switch (active) {
      case tabs[1]:
        return <div>Add ons</div>;
      case tabs[2]:
        return <div>Appearance</div>;
      case tabs[3]:
        return <div>Transaction Fee</div>;

      default:
        return <General data={data} />;
    }
  };
  return (
    <div className={styles.single_category}>
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
      {getContainerFromTab()}
    </div>
  );
};

export default SingleCategory;
