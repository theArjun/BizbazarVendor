import React, { useEffect, useState } from "react";
import styles from "./MonthlyOrderReport.module.css";
import { useNavigate } from "react-router-dom";
import { Breadcrumb, Button, Result } from "antd";
import { MonthlyOrderReportSearch, MonthlyOrderReportTable } from "../..";
import { useGetMonthlyReport } from "../../../apis/ReportsApi";
import { useMemo } from "react";
import useDebounce from "../../../utils/Hooks/useDebounce";
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
  const [bottom, setBottom] = useState(false);
  const navigate = useNavigate();
  const {
    data: reportData,
    isLoading: reportLoading,
    isFetchingNextPage,
    fetchNextPage,
    isError,
    error,
  } = useGetMonthlyReport(params);
  // handle data when the there  is scroll in product table
  const handleScroll = (event) => {
    const condition =
      event.target.scrollTop + event.target.offsetHeight + 100 >
      event.target.scrollHeight;
    setBottom(condition);
  };
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
  const getStatus = useMemo(() => {
    if (reportData?.pages) {
      let statuses = Object.values(
        reportData?.pages?.at(0)?.data?.order_statuses || {}
      );
      return statuses;
    }
    return [];
  }, [reportData]);
  // getUserGroups
  const getUserGroups = () => {
    let temp = reportData?.pages?.at(-1)?.data?.usergroups || {};
    return Object.values(temp)?.map((el, i) => ({
      label: el?.usergroup,
      value: el?.usergroup_id,
    }));
  };
  // Handle infinite scroll
  useDebounce(
    () => {
      if (!bottom) {
        return;
      }
      fetchNextPage();
    },
    300,
    [bottom]
  );
  return (
    <div className={styles.container}>
      <Breadcrumb>
        <Breadcrumb.Item>Reports</Breadcrumb.Item>
        <Breadcrumb.Item>Monthly order reports</Breadcrumb.Item>
      </Breadcrumb>
      <MonthlyOrderReportSearch
        status={getStatus}
        userGroup={getUserGroups()}
        params={params}
        setParams={setParams}
      />
      <MonthlyOrderReportTable
        handleScroll={handleScroll}
        data={getReportData}
        loading={reportLoading || isFetchingNextPage}
        status={getStatus}
      />
    </div>
  );
};

export default MonthlyOrderReport;
