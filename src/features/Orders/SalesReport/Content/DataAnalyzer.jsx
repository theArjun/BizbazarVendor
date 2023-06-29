import React from "react";
import Table from "../../../../component/DataPresenters/Table/Table";
import BarChart from "../../../../component/DataPresenters/BarChart/BarChart";
import PieChart from "../../../../component/DataPresenters/PieChart/PieChart";
import { useGetSalesReportTableData } from "../../../../apis/SalesApi";
import Spinner from "../../../../component/Spinner/Spinner";
import { useMemo } from "react";

const DataAnalyzer = ({ report_id, table_id }) => {
  //Getting table data
  const { data, isLoading } = useGetSalesReportTableData(report_id, table_id);
  const getDataPresenter = (type, data) => {
    switch (type) {
      case "T":
        return <Table table_data={data} />;
      case "bar":
        return <BarChart />;
      default:
        return <PieChart />;
    }
  };
  const tableData = useMemo(() => {
    return data?.data || {};
  }, [data]);
  const tableType = useMemo(() => {
    return data?.data?.table?.type;
  });
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="data_analyzer">
      {getDataPresenter(tableType, tableData)}
    </div>
  );
};

export default DataAnalyzer;
