import React from "react";
import Table from "../../../../component/DataPresenters/Table/Table";
import BarChart from "../../../../component/DataPresenters/BarChart/BarChart";
import PieChart from "../../../../component/DataPresenters/PieChart/PieChart";
import { useGetSalesReportTableData } from "../../../../apis/SalesApi";
import Spinner from "../../../../component/Spinner/Spinner";
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
const DataAnalyzer = ({ report_id, table_id }) => {
  const [params, setParams] = useState(INITIAL_VALUES);
  const [bottom, setBottom] = useState(false);
  //Getting table data
  const { data, isLoading } = useGetSalesReportTableData(
    report_id,
    table_id,
    params
  );
  useEffect(() => {
    setParams((el) => ({ ...el, count: ITEMS_PER_PAGE }));
  }, [table_id]);
  // handle data when the there  is scroll in product table
  const handleScroll = (event) => {
    const condition =
      event.target.scrollTop + event.target.offsetHeight + 100 >
      event.target.scrollHeight;
    setBottom(condition);
  };
  // Getting components for different types of data
  const getDataPresenter = (type, data) => {
    switch (type) {
      case "T":
        return (
          <Table
            table_data={data || {}}
            handleScroll={handleScroll}
            loading={isLoading}
          />
        );
      case "B":
        return <BarChart data={data || {}} />;
      case "P":
        return <PieChart data={data || {}} />;
      case "I":
        return (
          <IntervalTable
            data={data?.table || {}}
            loading={isLoading}
            handleScroll={handleScroll}
          />
        );
      default:
        return <Spinner />;
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
