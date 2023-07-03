import React from "react";
import Table from "../../../../component/DataPresenters/Table/Table";
import BarChart from "../../../../component/DataPresenters/BarChart/BarChart";
import PieChart from "../../../../component/DataPresenters/PieChart/PieChart";
import { useGetSalesReportTableData } from "../../../../apis/SalesApi";
import { useMemo } from "react";
import IntervalTable from "../../../../component/DataPresenters/IntervalTable/IntervalTable";
import { useState } from "react";
import useDebounce from "../../../../utils/Hooks/useDebounce";
import { useEffect } from "react";
const ITEMS_PER_PAGE = 50;
const INITIAL_VALUES = {
  time_from: "",
  time_to: "",
  period: "C",
  count: ITEMS_PER_PAGE,
};
const DataAnalyzer = ({ report_id, table_id, params: parentParams }) => {
  const [params, setParams] = useState(INITIAL_VALUES);
  const [bottom, setBottom] = useState(false);
  //Getting table data
  const { data, isLoading, isFetching } = useGetSalesReportTableData(
    report_id,
    table_id,
    params
  );
  useEffect(() => {
    setParams((el) => ({
      ...el,
      count: ITEMS_PER_PAGE,
      period: parentParams?.period,
      time_from: parentParams?.time_from,
      time_to: parentParams?.time_to,
    }));
  }, [table_id, parentParams]);
  // handle data when the there  is scroll in product table
  const handleScroll = (event) => {
    const condition =
      event.target.scrollTop + event.target.offsetHeight + 100 >
      event.target.scrollHeight;
    setBottom(condition);
  };
  // Getting components for different types of data
  const getDataPresenter = (type, tableData) => {
    switch (type) {
      case "T":
        return (
          <Table
            table_data={tableData || {}}
            handleScroll={handleScroll}
            loading={isLoading || isFetching}
          />
        );
      case "B":
        return <BarChart data={tableData || {}} />;
      case "P":
        return <PieChart data={tableData || {}} />;
      case "I":
        return (
          <IntervalTable
            data={tableData?.table || {}}
            loading={isLoading || isFetching}
            handleScroll={handleScroll}
          />
        );
      default:
        return (
          <IntervalTable
            data={tableData?.table || {}}
            loading={isLoading || isFetching}
            handleScroll={handleScroll}
          />
        );
    }
  };
  const tableData = useMemo(() => {
    return data?.data || {};
  }, [data]);
  const tableType = useMemo(() => {
    try {
      if (
        data?.data?.table?.interval_id === "7" &&
        data?.data?.table?.type === "T"
      ) {
        return "I";
      }
      return data?.data?.table?.type;
    } catch (e) {
      console.log(e.message);
    }
  });
  // Handle infinite scroll
  useDebounce(
    () => {
      if (!bottom) {
        return;
      } else if (
        params.count > Object.values(tableData?.table?.elements || {}).length
      ) {
        return;
      } else {
        let temp_param = { ...params };
        temp_param.count = temp_param.count + ITEMS_PER_PAGE;
        setParams(temp_param);
      }
    },
    300,
    [bottom]
  );
  return (
    <React.Fragment>{getDataPresenter(tableType, tableData)}</React.Fragment>
  );
};

export default DataAnalyzer;
