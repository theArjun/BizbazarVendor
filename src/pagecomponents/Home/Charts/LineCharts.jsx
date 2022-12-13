import React, { lazy, Suspense } from "react";
import styles from "./Linechart.module.css";
const Chart = lazy(() => import("react-apexcharts"));

function LineCharts({ series, options, height = "300px" }) {
  return (
    <Suspense fallback={<div>..loading</div>}>
      <div className={styles.container} style={{ height: `${height}` }}>
        <div className="heading-tab" style={{ marginLeft: "10px" }}>
          Statistic
        </div>
        <Chart
          type="line"
          series={series}
          options={options}
          width="100%"
          height={"95%"}
          className={styles.chart}
        />
      </div>
    </Suspense>
  );
}

export default LineCharts;
