import React from "react";
import styles from "./Table.module.css";
import { Link, useNavigate } from "react-router-dom";
import { Table } from "antd";
import useWindowSize from "../../../../utils/Hooks/useWindowSize";
const ShipmentTable = ({ loading, shipments = [] }) => {
  const windowSize = useWindowSize();
  const navigate = useNavigate();
  // Getting date time value
  const getTimeAndDate = (timeStamp) => {
    const date = new Date(parseInt(timeStamp) * 1000);
    const monthyear = date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });

    const time = date.toLocaleString("en-US", {
      hour: "2-digit",
      minute: "numeric",
    });
    return monthyear + ", " + time;
  };

  const columns = [
    {
      title: "sn",
      dataIndex: "firstname",
      key: "order_id",
      render: (text, dat, i) => <div>{i + 1}</div>,
      width: 60,
    },
    {
      title: "Shipment ID",
      dataIndex: "shipment_id",
      key: "shipment_id",
      render: (text, dat) => (
        <div
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => navigate(`/Orders/orders details/${dat.order_id}`)}
        >
          #{text}
        </div>
      ),
      width: 140,
      sorter: (a, b) => {},
    },
    {
      title: "Order ID",
      dataIndex: "order_id",
      key: "order_id",
      render: (text, dat) => (
        <div
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => navigate(`/Orders/orders details/${dat.order_id}`)}
        >
          #{text}
        </div>
      ),
    },
    {
      title: "Order status",
      dataIndex: "order_status",
      key: "order_status",
    },
    {
      title: "Shipment  date",
      dataIndex: "timestamp",
      key: "order_id",
      render: (text) => getTimeAndDate(text),
      sorter: (a, b) => {},
    },
    {
      title: "Order  date",
      dataIndex: "timestamp",
      key: "order_id",
      render: (text) => getTimeAndDate(text),
      sorter: (a, b) => {},
    },

    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
    },

    {
      title: "Full order shipment",
      dataIndex: "full_order_shipment",
      key: "full_order_shipment",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];

  function onChange(pagination, filters, sorter, extra) {
    setSortBy(sorter);
    setOrder([]);
  }

  return (
    <React.Fragment>
      <Table
        id="hello"
        rowKey={"order_id"}
        columns={columns}
        loading={loading}
        dataSource={shipments}
        pagination={false}
        scroll={{
          y: windowSize.height > 670 ? 450 : 300,
          x: 1000,
        }}
        onChange={onChange}
      />
    </React.Fragment>
  );
};

export default ShipmentTable;
