import React, { useState } from "react";
import styles from "./MonthlyOrderReport.module.css";
import { Breadcrumb } from "antd";
import { MonthlyOrderReportSearch, MonthlyOrderReportTable } from "../..";
import { useGetMonthlyReport } from "../../../apis/ReportsApi";
import { useGetStatuses } from "../../../apis/StatusApi";
const INITIAL_PARAMS={
      order_id:'',
      status_id:'',
      user_type:'',
      usergroup_id:'',
      time_from:'',
      time_to:''

}
const MonthlyOrderReport = () => {
  const [params, setParams]=useState(INITIAL_PARAMS)
  const { data: reportData, isLoading: reportLoading } = useGetMonthlyReport(params);
  const { data: statusData, isLoading: statusLoading } = useGetStatuses()
  // get Status data 
  const getReportData = () => {
    let test_data = [];
    if (reportData) {
      let temp = reportData?.data?.report?reportData?.data?.report:{};
      Object.values(temp)?.map((el) => {
        Object.entries(el)?.map((item, index) => {
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
// getUserGroups
const getUserGroups=()=>{
  let temp=reportData?.data?.usergroups?reportData?.data?.usergroups:{}
return Object.values(temp)?.map((el,i)=>({label:el?.usergroup, value:el?.usergroup_id}))
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
      <MonthlyOrderReportSearch status={getStatus()} userGroup={getUserGroups()} params={params} setParams={setParams} />
      <MonthlyOrderReportTable data={getReportData()}  loading={reportLoading} status={getStatus()}/>
    </div>
  );
};

export default MonthlyOrderReport;
