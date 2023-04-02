import React, { lazy, Suspense, useState } from "react";
import styles from "./Linechart.module.css";
import Sales from "./Charts/Sales";
import Category from "./Charts/Category";
import cx from "classnames";
const tabs = ["sales", "category"];
function LineCharts({ height = "300px", graphData }) {
  const [active, setActive] = useState(tabs[0]);
  const getContainerFromTab = () => {
    switch (active) {
      case tabs[1]:
        return (
          <Category
            styles={styles}
            data={graphData?.dashboard_statistics_category_chart || {}}
          />
        );

      default:
        return (
          <Sales
            styles={styles}
            data={graphData?.dashboard_statistics_sales_chart || {}}
          />
        );
    }
  };
  return (
    <Suspense fallback={<div>..loading</div>}>
      <div className={styles.container} style={{ height: `${height}` }}>
        <div className={styles.left} style={{ marginLeft: "10px" }}>
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
        {getContainerFromTab()}
      </div>
    </Suspense>
  );
}

export default LineCharts;
