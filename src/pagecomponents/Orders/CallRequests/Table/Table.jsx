import React, { useEffect, useState } from "react";
import { Table, Dropdown, Button, Tag } from "antd";
import styles from "./Table.module.css";
import { AiFillSetting } from "react-icons/ai";
import { apicall } from "../../../../utils/apicall/apicall";
import useWindowSize from "../../../../utils/Hooks/useWindowSize";

const ViewOrderTable = ({ callRequest, setCallRequest, status, loading }) => {
  const windowSize = useWindowSize();

  const getStatusTag = (data, obj) => {
    const [statusOfRow] = status.filter((dat) => dat.status === data);

    return (
      <Tag className={styles.dpContainer} color={statusOfRow?.params?.color}>
        {statusOfRow?.description}
      </Tag>
    );
  };

  const columns = [
    {
      title: "REQ ID",
      dataIndex: "request_id",
      key: "request_id",
      render: (code) => <div style={{ color: "blue" }}>#{code}</div>,
    },
    {
      title: "ORDER STATUS",
      dataIndex: "order_status",
      key: "request_id",
      render: (text, obj) => getStatusTag(text, obj.order_id),
    },
    {
      title: "DATE",
      dataIndex: "timestamp",
      key: "request_id",
      render: (timestamp) => <p>{timestamp}</p>,
    },
    {
      title: "CUSTOMER",
      dataIndex: "name",
      key: "request_id",
    },
    {
      title: "PHONE",
      dataIndex: "phone",
      key: "request_id",
    },
    {
      title: "Product",
      dataIndex: "product",
      key: "request_id",
    },
  ];

  return (
    <div>
      <Table
        id="cancelreq"
        columns={columns}
        dataSource={callRequest}
        loading={loading}
        pagination={false}
        scroll={{
          y: windowSize.height > 670 ? 530 : 330,
          x: 1000,
        }}
      />
    </div>
  );
};

export default ViewOrderTable;
