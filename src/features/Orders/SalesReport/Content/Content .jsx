import React, { useEffect, useMemo } from "react";
import styles from "./Content.module.css";
import { useState } from "react";
import TabButtons from "../../../../component/TabButtons/TabButtons";
import { useGetSingleSalesReport } from "../../../../apis/SalesApi";
import Spinner from "../../../../component/Spinner/Spinner";
import DataAnalyzer from "./DataAnalyzer";
const Content = ({ activeID, params }) => {
  const [active, setActive] = useState("");
  const { data: salesData, isLoading: salesLoading } =
    useGetSingleSalesReport(activeID);
  // Set default active tab
  useEffect(() => {
    setActive(salesData?.data?.table?.table_id);
  }, [salesData?.data?.table?.table_id]);

  // Getting tabs button name and id
  const tabButtons = useMemo(() => {
    let temp = Object.values(salesData?.data?.report?.tables || {});
    let finalData = temp.map((item, i) => ({
      name: item?.description,
      value: item?.table_id,
    }));
    return finalData || [];
  }, [salesData]);
  if (salesLoading) {
    return <Spinner />;
  }
  return (
    <div className={styles.content}>
      <div className={styles.tabs}>
        <TabButtons tabs={tabButtons} active={active} setActive={setActive} />
      </div>
      <div className={styles.contentContainer}>
        <DataAnalyzer table_id={active} report_id={activeID} params={params} />
      </div>
    </div>
  );
};

export default Content;
