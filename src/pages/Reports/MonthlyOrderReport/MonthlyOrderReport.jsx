import React from "react";
import styles from "./MonthlyOrderReport.module.css";
import { Breadcrumb } from "antd";
import { MonthlyOrderReportSearch, MonthlyOrderReportTable } from "../..";
import { useGetMonthlyReport } from "../../../apis/ReportsApi";
import { useGetStatuses } from "../../../apis/StatusApi";

const MonthlyOrderReport = () => {
  const { data: reportData, isLoading: reportLoading } = useGetMonthlyReport();
  const { data: statusData, isLoading: statusLoading } = useGetStatuses()
  // get Status data 
  const getReportData = () => {
    let test_data = [];
    if (reportData) {
      let temp = reportData?.data?.report;
      Object.values(temp).map((el) => {
        Object.entries(el).map((item, index) => {
          item.map((entry, inin) => {
            if (inin === 1) {
              test_data.push(entry);
            }
          });
        });
      });
      return test_data;
    }
    return [];
  };
// status data 
const getStatus=()=>{
    if(statusData){
        return statusData?.data?.statuses;
    }
    return []
}
  return (
    <div className={styles.container}>
      <Breadcrumb>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="">Reports</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Monthly order reports</Breadcrumb.Item>
      </Breadcrumb>
      <MonthlyOrderReportSearch />
      <MonthlyOrderReportTable data={getReportData()}  loading={reportLoading} status={getStatus()}/>
    </div>
  );
};

export default MonthlyOrderReport;
