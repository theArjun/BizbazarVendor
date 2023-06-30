import React from "react";
import Table from "../../../../component/DataPresenters/Table/Table";
import BarChart from "../../../../component/DataPresenters/BarChart/BarChart";
import PieChart from "../../../../component/DataPresenters/PieChart/PieChart";
import { useGetSalesReportTableData } from "../../../../apis/SalesApi";
import Spinner from "../../../../component/Spinner/Spinner";
import { useMemo } from "react";
import IntervalTable from "../../../../component/DataPresenters/IntervalTable/IntervalTable";

const DataAnalyzer = ({ report_id, table_id }) => {
  //Getting table data
  const { data, isLoading } = useGetSalesReportTableData(report_id, table_id);
  const getDataPresenter = (type, data) => {
    switch (type) {
      case "T":
        return <Table table_data={data} />;
      case "B":
        return <BarChart />;
      case "P":
        return <PieChart />;
      default:
        return <IntervalTable data={data?.table || {}} />;
    }
  };
  const tableData = useMemo(() => {
    return data?.data || {};
  }, [data]);
  const tableType = useMemo(() => {
    try {
      let temp = data?.data?.table?.intervals[0]?.interval_code === "total";
      if (!temp) {
        return "intervals";
      }
      return data?.data?.table?.type;
    } catch (e) {
      console.log(e.message);
    }
  });
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <React.Fragment>{getDataPresenter(tableType, tableData)}</React.Fragment>
  );
};

export default DataAnalyzer;
