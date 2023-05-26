import React, { useState } from "react";
import cx from "classnames";
import styles from "./SingleCategory.module.css";
import General from "./components/General/General";
import Addons from "./components/Addons/Addons";
import Appearance from "./components/Appearance/Appearance";
import Transaction from "./components/TransactionFee/Transaction";
const tabs = ["General", "Add-ons", "Appearance", "Transaction fee"];
const SingleCategory = ({ data, category_fee = {} }) => {
  const [active, setActive] = useState("General");
  const getContainerFromTab = () => {
    switch (active) {
      case tabs[1]:
        return <Addons data={data} />;
      case tabs[2]:
        return <Appearance data={data} />;
      case tabs[3]:
        return <Transaction data={category_fee} />;

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
