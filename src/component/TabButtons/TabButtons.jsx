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
              active === dat.value ? styles.bgColor : null
            )}
            key={i}
            onClick={() => setActive(dat.value)}
          >
            {dat.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabButtons;
