import React from "react";
import styles from "./TabButtons.module.css";
import cx from "classnames";
const TabButtons = ({ active, setActive, tabs = [] }) => {
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

export default TabButtons;
