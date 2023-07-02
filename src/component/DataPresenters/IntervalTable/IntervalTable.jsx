import { Table } from "antd";
import styles from "./IntervalTable.module.css";
import useWindowSize from "../../../utils/Hooks/useWindowSize";
import { useEffect } from "react";
const IntervalTable = ({ data, rows = [], loading, handleScroll }) => {
  const windowSize = useWindowSize();
  let intervalArray = Object.values(data?.intervals || {});
  let intervalRows = Object.values(data?.elements || {});
  let intervalValues = data.values || {};

  useEffect(() => {
    document
      .querySelector("#table > div > div.ant-table-body")
      ?.addEventListener("scroll", handleScroll);

    return () => {
      document
        .querySelector("#table > div > div.ant-table-body")
        ?.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);
  // This is function  is used to retrieve column names
  const getIntervals = () => {
    const finalData = intervalArray.map((item) => ({
      title: item?.description,
      dataIndex: item?.interval_id,
      key: item?.interval_code,
    }));
    return finalData || {};
  };

  // This function is used to get data values
  const getDataValues = () => {
    let preparedData = intervalRows?.map((item) => ({
      [data?.parameter]: item?.full_description,
      ...intervalValues[item?.element_hash],
    }));
    return preparedData;
  };
  const columns = [
    {
      title: data?.parameter,
      dataIndex: data?.parameter,
      key: data?.parameter,
      width: 200,
    },
    ...getIntervals(),
  ];
  return (
    <div className={styles.tableContainer}>
      <Table
        id="table"
        rowKey={data?.parameter}
        columns={columns}
        dataSource={getDataValues()}
        pagination={false}
        scroll={{
          y: windowSize.height > 670 ? 450 : 300,
          x: 700,
        }}
      />
    </div>
  );
};

export default IntervalTable;
