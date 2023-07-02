import React, { lazy } from "react";
import styles from "./BarChart.module.css";
const Chart = lazy(() => import("react-apexcharts"));
const BarChart = ({ data }) => {
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
  // Getting values
  const getValues = (barData) => {
    try {
      let temp = Object.values(barData?.elements);
      let labels = temp?.reduce((accumulator, currentValues) => {
        accumulator.push(currentValues?.element_id);
        return accumulator;
      }, []);
      return labels;
    } catch (e) {
      console.log(e.message);
    }
  };
  const series = [
    {
      data: getValues(data?.table),
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
      categories: getLabels(data?.table),
      labels: {
        style: {
          // colors: colors,
          fontSize: "12px",
        },
      },
    },
  };
  return (
    <Chart
      type="bar"
      series={series}
      options={options}
      height="100%"
      width="100%"
    />
  );
};

export default BarChart;
