import React from "react";
import styles from "./RateAreas.module..css";
import { Table, Tag } from "antd";
import { useNavigate } from "react-router-dom";

function RateAreas() {
  const navigate = useNavigate();
  const dataSource = [
    {
      key: "1",
      position: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      position: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];

  const columns = [
    {
      title: "Pos",
      dataIndex: "position",
      render: (text, dat) => (
        <div onClick={() => navigate("/Setting/Rate Areas/hello")}>{text}</div>
      ),
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Tools",

      render: (text, dat) => <div>Edit</div>,
    },

    {
      title: "Status",
      dataIndex: "status",
      render: (text, dat) => (
        <Tag color={text === "A" ? "green" : "red"}>
          {text === "A" ? "Active" : "Disable"}
        </Tag>
      ),
    },
  ];
  return (
    <div className={styles.container}>
      <Table pagination={false} dataSource={dataSource} columns={columns} />
    </div>
  );
}

export default RateAreas;
