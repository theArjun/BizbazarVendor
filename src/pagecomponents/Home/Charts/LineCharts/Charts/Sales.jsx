import React, { lazy } from "react";
const Chart = lazy(() => import("react-apexcharts"));
const Sales = ({ styles, data }) => {
  // get labels
  const getLabels = () => {
    let labels = Object.keys(data);
    return labels;
  };
  // getting current data
  const getCurrentData = () => {
    let current = Object.values(data)?.reduce((accumulator, currentValue) => {
      accumulator.push(currentValue?.cur);
      return accumulator;
    }, []);
    return current;
  };
  // getting previous data
  const getPreviousData = () => {
    let previous = Object.values(data)?.reduce((accumulator, currentValue) => {
      accumulator.push(currentValue?.prev);
      return accumulator;
    }, []);
    return previous;
  };
  const series = [
    {
      name: "Current",
      data: getCurrentData(),
    },
    {
      name: "Previous",
      data: getPreviousData(),
    },
  ];
  const options = {
    fill: {
      colors: ["#1DABB8", "#fc7f12"],
    },
    stroke: {
      curve: "smooth",
    },
    colors: ["#218c74", "#fc7f12"],
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: getLabels(),
      labels: {
        // rotate: -15,
        // rotateAlways: true,
        maxHeight: 70,
      },
      responsive: [
        {
          breakpoint: undefined,
          options: {},
        },
      ],

      tickPlacement: "on",
    },
  };
  return (
    <React.Fragment>
      <Chart
        type="line"
        series={series}
        options={options}
        width="100%"
        height={"95%"}
        className={styles.chart}
      />
    </React.Fragment>
  );
};

export default Sales;
