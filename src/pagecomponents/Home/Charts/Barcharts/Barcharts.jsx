import React, { lazy, Suspense } from "react";
import styles from "./Barcharts.module.css";
const Chart = lazy(() => import("react-apexcharts"));

function Barcharts({ height = "800" }) {
  const gRN = () => {
    return Math.ceil(Math.random() * (1000 - 1) + 1);
  };

  const series = [
    {
      name: "Total",
      data: [
        gRN(),
        gRN(),
        gRN(),
        gRN(),
        gRN(),
        gRN(),
        gRN(),
        gRN(),
        gRN(),
        gRN(),
        gRN(),
        gRN(),
        gRN(),
        gRN(),
        gRN(),
        gRN(),
        gRN(),
        gRN(),
        gRN(),
        gRN(),
        gRN(),
        gRN(),
        gRN(),
        gRN(),
        gRN(),
        gRN(),
        gRN(),
        gRN(),
        gRN(),
        gRN(),
      ],
    },
    {
      name: "Active",
      data: [
        gRN(),
        gRN(),
        gRN(),
        gRN(),
        gRN(),
        gRN(),
        gRN(),
        gRN(),
        gRN(),
        gRN(),
        gRN(),
        gRN(),
        gRN(),
        gRN(),
        gRN(),
        gRN(),
        gRN(),
        gRN(),
        gRN(),
        gRN(),
        gRN(),
        gRN(),
        gRN(),
        gRN(),
        gRN(),
        gRN(),
        gRN(),
        gRN(),
        gRN(),
      ],
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
      labels: {
        rotate: -15,
        rotateAlways: true,
        maxHeight: 37,
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
          Statistic
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
