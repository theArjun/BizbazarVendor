import React, { useEffect } from "react";
import styles from "./Content.module.css";
import { useState } from "react";
import Table from "../../../../component/DataPresenters/Table/Table";
import BarChart from "../../../../component/DataPresenters/BarChart/BarChart";
import PieChart from "../../../../component/DataPresenters/PieChart/PieChart";

import TabButtons from "../../../../component/TabButtons/TabButtons";
const Content = ({ tabs }) => {
  const [active, setActive] = useState(tabs[0]);
  const getDataPresenter = (type) => {
    switch (type) {
      case "table":
        return <Table />;
      case "bar":
        return <BarChart />;
      default:
        return <PieChart />;
    }
  };
  useEffect(() => {
    setActive(tabs[0]);
  }, [tabs]);
  return (
    <div className={styles.content}>
      <div className={styles.tabs}>
        <TabButtons tabs={tabs} active={active} setActive={setActive} />
      </div>
      <div className={styles.contentContainer}>{getDataPresenter("bar")}</div>
    </div>
  );
};

export default Content;
