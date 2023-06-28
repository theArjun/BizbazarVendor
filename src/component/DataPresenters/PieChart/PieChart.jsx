import React, { lazy } from "react";
import styles from "./PieChart.module.css";
const Chart = lazy(() => import("react-apexcharts"));
const PieChart = () => {
  let options = {
    legend: {
      position: "bottom",
    },
    chart: {
      type: "pie",
    },
    labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            border: {
              color: "#c2c2c2",
              width: 1,
              radius: 2,
            },
            position: "bottom",
          },
        },
      },
    ],
  };
  return (
    <div className={styles.pie_chart_container}>
      <Chart type="pie" series={[44, 55, 13, 43, 22, 47]} options={options} />
    </div>
  );
};

export default PieChart;
