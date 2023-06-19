import React, { lazy, Suspense } from "react";
import styles from "./Barcharts.module.css";
const Chart = lazy(() => import("react-apexcharts"));

function Barcharts({ height = "800", graphData }) {
  // get Labels
  const getLabels = () => {
    let data = graphData?.reduce((accumulator, currentValue) => {
      accumulator.push(currentValue?.category);
      return accumulator;
    }, []);
    return data;
  };
  // get Totals
  const getTotals = () => {
    let data = graphData?.reduce((accumulator, currentValue) => {
      accumulator.push(currentValue?.total);
      return accumulator;
    }, []);
    return data;
  };
  // get Actives
  const getActives = () => {
    let data = graphData?.reduce((accumulator, currentValue) => {
      accumulator.push(currentValue?.active);
      return accumulator;
    }, []);
    return data;
  };
  const series = [
    {
      name: "Total",
      data: getTotals(),
    },
    {
      name: "Active",
      data: getActives(),
    },
  ];
  var options = {
    fill: {
      colors: ["#1DABB8", "#F3D89F"],
    },
    colors: ["#1DABB8", "#F3D89F"],
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        borderRadius: 3,
        columnWidth: "80%",
      },
    },

    xaxis: {
      categories: getLabels(),
      labels: {
        // rotate: -15,
        // rotateAlways: true,
        maxHeight: 70,
      },

      plotOptions: {
        bar: {
          borderRadius: 10,
          columnWidth: "50%",
        },
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
    <Suspense fallback={<div>..loading</div>}>
      <div className={styles.container} style={{ height: height + "px" }}>
        <div className="heading-tab" style={{ marginLeft: "10px" }}>
          Category barchart
        </div>
        <Chart
          type="bar"
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

export default Barcharts;
