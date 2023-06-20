import React from "react";
import useWindowSize from "../../../../../utils/Hooks/useWindowSize";
import { Table } from "antd";
const RequestInformationTable = ({ data = [] }) => {
  const windowSize = useWindowSize();
  const columns = [
    {
      title: "Product",
      dataIndex: "product",
      data: "data",
      key: "product",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => {},
      render: (price) => <p>{parseFloat(price).toFixed(2)}</p>,
    },
    {
      title: "Quantity",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Reason",
      key: "reason",
      dataIndex: "reason",
    },
  ];
  return (
    <div className="information_table">
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

export default RequestInformationTable;
