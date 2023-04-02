import React, { lazy } from "react";
const Chart = lazy(() => import("react-apexcharts"));
const Category = ({ styles, data }) => {
  // get labels
  const getLabels = () => {
    let labels = Object.keys(data);
    return labels;
  };
  // getting current data
  const getActiveData = () => {
    let active = Object.values(data)?.reduce((accumulator, currentValue) => {
      accumulator.push(currentValue?.cur);
      return accumulator;
    }, []);
    return active;
  };
  // getting previous data
  const getTotalData = () => {
    let total = Object.values(data)?.reduce((accumulator, currentValue) => {
      accumulator.push(currentValue?.prev);
      return accumulator;
    }, []);
    return total;
  };
  const series = [
    {
      name: "Active",
      data: getActiveData(),
    },
    {
      name: "Total",
      data: getTotalData(),
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

export default Category;
