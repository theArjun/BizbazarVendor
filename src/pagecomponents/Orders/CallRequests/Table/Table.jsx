import React from "react";
import { Table, Tag } from "antd";
import styles from "./Table.module.css";
import useWindowSize from "../../../../utils/Hooks/useWindowSize";
import { useNavigate } from "react-router-dom";
const ViewOrderTable = ({ callRequest, status, loading }) => {
  const windowSize = useWindowSize();
  const navigate = useNavigate();
  const getStatusTag = (data, obj) => {
    const [statusOfRow] = status.filter((dat) => dat.status === data);

    return (
      <Tag className={styles.dpContainer} color={statusOfRow?.params?.color}>
        {statusOfRow?.description}
      </Tag>
    );
  };
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
      title: "Req ID",
      dataIndex: "request_id",
      key: "request_id",
      width: 100,
      render: (code) => <div style={{ color: "blue" }}>#{code}</div>,
    },
    {
      title: "Order status",
      dataIndex: "order_status",
      key: "request_id",
      render: (text, obj) => getStatusTag(text, obj.order_id),
    },
    {
      title: "Request Date",
      dataIndex: "timestamp",
      key: "request_id",
      render: (timestamp) => getTimeAndDate(timestamp),
    },
    {
      title: "Customer",
      dataIndex: "name",
      key: "request_id",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "request_id",
    },
    {
      title: "Product",
      dataIndex: "product",
      key: "request_id",
      render: (product, row) => (
        <a onClick={() => navigate(`../products/${row?.product_id}`)}>
          {product}{" "}
        </a>
      ),
    },
  ];

  return (
    <div>
      <Table
        id="cancelreq"
        rowKey={"request_id"}
        columns={columns}
        dataSource={callRequest}
        loading={loading}
        pagination={false}
        scroll={{
          y: windowSize.height > 670 ? 450 : 200,
          x: 800,
        }}
      />
    </div>
  );
};

export default ViewOrderTable;
