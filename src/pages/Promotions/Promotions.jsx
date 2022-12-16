import React from "react";
import styles from "./Promotions.module.css";
import { Breadcrumb, Button, Table } from "antd";
import { useNavigate } from "react-router-dom";

function Promotions() {
  const columns = [
    {
      title: "Full Name",
      width: 100,
      dataIndex: "name",
      key: "name",
      fixed: "left",
    },
    {
      title: "Age",
      width: 100,
      dataIndex: "age",
      key: "age",
      fixed: "left",
    },

    {
      title: "Column 4",
      dataIndex: "address",
      key: "4",
      width: 150,
    },
    {
      title: "Column 5",
      dataIndex: "address",
      key: "5",
      width: 150,
    },
  ];

  const data = [];

  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.breadcumb}>
        <Breadcrumb>
          <Breadcrumb.Item>Marketing</Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="">Promotions</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Promotions</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className={styles.container}>
        <Table pagination={false} columns={columns} dataSource={data} />
      </div>
      <Button
        className={styles.buttonAddCatalog}
        onClick={() => navigate("/Marketing/Add Catalog Promotion")}
      >
        Add Catalog Promotion
      </Button>
    </div>
  );
}

export default Promotions;
