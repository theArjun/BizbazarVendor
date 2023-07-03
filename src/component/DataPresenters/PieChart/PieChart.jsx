import React, { lazy } from "react";
import { Empty } from "antd";
import styles from "./PieChart.module.css";
const Chart = lazy(() => import("react-apexcharts"));
const PieChart = ({ data }) => {
  // Getting labels
  const getLabels = (barData) => {
    try {
      let temp = barData?.pie_data || [];
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
      let temp = barData?.pie_data || [];
      let labels = temp?.reduce((accumulator, currentValues) => {
        accumulator.push(parseFloat(currentValues?.count || 0));
        return accumulator;
      }, []);
      return labels;
    } catch (e) {
      console.log(e.message);
    }
  };
  let options = {
    chart: {
      height: 350,
      toolbar: {
        show: true,
      },
    },
    dataLabels: {
      enabled: true,
    },
    series: getValues(data?.new_array),
    legend: {
      position: "bottom",
    },

    labels: getLabels(data?.new_array),
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
  if (!data?.new_array || !data.new_array?.pie_data) {
    return <Empty className={styles.empty} />;
  }
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
