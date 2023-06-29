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

export default Tabs;
