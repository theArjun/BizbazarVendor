import React, { lazy } from "react";
import styles from "./PieChart.module.css";
const Chart = lazy(() => import("react-apexcharts"));
const PieChart = ({ data }) => {
  // Getting labels
  const getLabels = (barData) => {
    try {
      let temp = Object.values(barData?.elements || {});
      let labels = temp?.reduce((accumulator, currentValues) => {
        accumulator.push(currentValues?.full_description);
        return accumulator;
      }, []);
      return labels;
    } catch (err) {
      console.log(err.message);
    }
  };
  let options = {
    chart: {
      height: 350,
      type: "donut",
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    series: [12, 45, 36],
    legend: {
      position: "bottom",
    },

    labels: getLabels(data?.table),
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
    <React.Fragment>
      <Chart
        type="pie"
        series={options.series}
        options={options}
        height="100%"
        width="100%"
      />
    </React.Fragment>
  );
};

export default PieChart;
