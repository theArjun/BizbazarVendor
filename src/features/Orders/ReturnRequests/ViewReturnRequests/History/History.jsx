import React from "react";
import styles from "./History.module.css";
import useWindowSize from "../../../../../utils/Hooks/useWindowSize";
import { Table } from "antd";

const History = ({ data = [] }) => {
  const windowSize = useWindowSize();
  const columns = [
    {
      title: "S.N",
      dataIndex: "sn",
      key: "sn",
      render: (data, row, i) => {
        return <div>{i + 1}</div>;
      },
    },
    {
      title: "Old shipping",
      dataIndex: "old_shipping",
      key: "old_shipping",
    },
    {
      title: "New shipping",
      dataIndex: "new_shipping",
      key: "new_shipping",
    },
    {
      title: "Charge",
      dataIndex: "charge",
      key: "charge",
    },
    {
      title: "Time",
      key: "time",
      dataIndex: "time",
    },
    {
      title: "Comment",
      key: "comment",
      dataIndex: "comment",
    },
  ];
  return (
    <div className="history_table">
      {" "}
      <Table
        id="product"
        rowKey={"product_id"}
        columns={columns}
        dataSource={data}
        pagination={false}
        scroll={{
          y: windowSize.height > 670 ? 450 : 300,
          x: 400,
        }}
      />{" "}
    </div>
  );
};

export default History;
