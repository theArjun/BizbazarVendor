import React from "react";
import cx from "classnames";
import styles from "./Tabs.module.css";
const Tabs = ({ active, setActive, tabs = [] }) => {
  return (
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
  );
};

export default Tabs;
