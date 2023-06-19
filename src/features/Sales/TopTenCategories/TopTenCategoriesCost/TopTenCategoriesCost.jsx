import React, { lazy } from "react";
import styles from "./TopTenCategoriesCost.module.css";
const Chart = lazy(() => import("react-apexcharts"));
const TopTenCategoriesCost = () => {
  const series = [
    {
      data: [21, 22, 10, 28, 16, 21, 13, 30],
    },
  ];
  const options = {
    chart: {
      height: 350,
      type: "bar",
      events: {
        click: function (chart, w, e) {
          // console.log(chart, w, e)
        },
      },
    },
    // colors: colors,
    plotOptions: {
      bar: {
        columnWidth: "45%",
        distributed: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: [
        ["John", "Doe"],
        ["Joe", "Smith"],
        ["Jake", "Williams"],
        "Amber",
        ["Peter", "Brown"],
        ["Mary", "Evans"],
        ["David", "Wilson"],
        ["Lily", "Roberts"],
      ],
      labels: {
        style: {
          // colors: colors,
          fontSize: "12px",
        },
      },
    },
  };
  return (
    <div className={styles.categories_item_sold}>
      <div className={styles.categories_item_sold_title}>
        Top 10 categories cost visualization.
      </div>
      <div className={styles.bar_chart_container}>
        <Chart
          type="bar"
          series={series}
          options={options}
          height="100%"
          width="100%"
        />
      </div>
    </div>
  );
};

export default TopTenCategoriesCost;
