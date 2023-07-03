import React, { lazy } from "react";
import { Empty } from "antd";
import styles from "./BarChart.module.css";
const Chart = lazy(() => import("react-apexcharts"));
const BarChart = ({ data }) => {
  // Getting labels
  const getLabels = (barData) => {
    try {
      let temp = Object.values(barData?.column_data || {});
      let labels = temp?.reduce((accumulator, currentValues) => {
        accumulator.push(currentValues?.full_descr || "");
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
      let temp = Object.values(barData?.column_data || {});
      let values = temp?.reduce((accumulator, currentValues) => {
        accumulator.push(parseFloat(currentValues?.value || 0));
        return accumulator;
      }, []);
      return values;
    } catch (e) {
      console.log(e.message);
    }
  };
  // Getting values
  const getColors = (barData) => {
    try {
      let temp = Object.values(barData?.column_data || {});
      let colors = temp?.reduce((accumulator, currentValues) => {
        accumulator.push(currentValues?.color || "");
        return accumulator;
      }, []);
      return colors;
    } catch (e) {
      console.log(e.message);
    }
  };
  const series = [
    {
      name: "Value",
      data: getValues(data?.new_array),
    },
  ];
  const options = {
    fill: {
      colors: getColors(data?.new_array),
    },
    chart: {
      height: 350,
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
      categories: getLabels(data?.new_array),
      labels: {
        style: {
          // colors: colors,
          fontSize: "12px",
        },
      },
    },
  };
  if (!data?.new_array || !data.new_array?.column_data) {
    return <Empty className={styles.empty} />;
  }
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
