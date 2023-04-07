import React, { useState } from "react";
import styles from "./MonthlyOrderReport.module.css";
import { Breadcrumb } from "antd";
import { MonthlyOrderReportSearch, MonthlyOrderReportTable } from "../..";
import { useGetMonthlyReport } from "../../../apis/ReportsApi";
import { useGetStatuses } from "../../../apis/StatusApi";
import { useMemo } from "react";
const INITIAL_PARAMS = {
  order_id: "",
  status_id: "",
  user_type: "",
  usergroup_id: "",
  time_from: "",
  time_to: "",
};
const MonthlyOrderReport = () => {
  const [params, setParams] = useState(INITIAL_PARAMS);
  const { data: reportData, isLoading: reportLoading } =
    useGetMonthlyReport(params);
  const { data: statusData, isLoading: statusLoading } = useGetStatuses();
  let getReportData = useMemo(() => {
    let temp = [];
    reportData?.pages?.map((el) => {
      Object.values(el?.data?.report)?.map((element) => {
        Object.entries(element)?.map((item, index) => {
          item.map((entry, i) => {
            if (i === 1) {
              temp.push(entry);
            }
          });
        });
      });
    });
    return temp || [];
  }, [reportData]);
  // status data
  const getStatus = () => {
    if (statusData) {
      return statusData?.data?.statuses;
    }
    return [];
  };
  // getUserGroups
  const getUserGroups = () => {
    let temp = reportData?.pages?.at(-1)?.data?.usergroups || {};
    console.log(reportData);
    return Object.values(temp)?.map((el, i) => ({
      label: el?.usergroup,
      value: el?.usergroup_id,
    }));
  };
  return (
    <div className={styles.container}>
      <Breadcrumb>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="">Reports</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Monthly order reports</Breadcrumb.Item>
      </Breadcrumb>
      <MonthlyOrderReportSearch
        status={getStatus()}
        userGroup={getUserGroups()}
        params={params}
        setParams={setParams}
      />
      <MonthlyOrderReportTable
        data={getReportData}
        loading={reportLoading}
        status={getStatus()}
      />
    </div>
  );
};

export default MonthlyOrderReport;
