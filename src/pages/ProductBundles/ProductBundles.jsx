import React from "react";
import styles from "./ProductBundles.module.css";
import { Breadcrumb, Table } from "antd";
import { Input, Button } from "antd";

function ProductBundles() {
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
      title: "Column 1",
      dataIndex: "address",
      key: "1",
      width: 150,
    },
    {
      title: "Column 2",
      dataIndex: "address",
      key: "2",
      width: 150,
    },
    {
      title: "Column 3",
      dataIndex: "address",
      key: "3",
      width: 150,
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
    {
      title: "Column 6",
      dataIndex: "address",
      key: "6",
      width: 150,
    },
    {
      title: "Column 7",
      dataIndex: "address",
      key: "7",
      width: 150,
    },
    {
      title: "Column 8",
      dataIndex: "address",
      key: "8",
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 100,
      render: () => <a>action</a>,
    },
  ];

  const data = [];
  for (let i = 0; i < 1000000; i++) {
    data.push({
      key: i,
      name: `Edrward ${i}`,
      age: 32,
      address: `London Park no. ${i}`,
    });
  }

  return (
    <>
      <div className={styles.breadcumb}>
        <Breadcrumb>
          <Breadcrumb.Item>Marketing</Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="">Product Bundles</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Product Bundles</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className={styles.container}>
        <div className={styles.search}>
          <div>
            Bundle name
            <Input placeholder="Basic usage" />
          </div>
          <div>
            Bundle with product
            <Input placeholder="Basic usage" />
          </div>
          <div>
            <Button className={styles.button}>search</Button>
          </div>
        </div>
        <Table
          columns={columns}
          dataSource={data}
          scroll={{
            x: 1500,
            y: 800,
          }}
        />
      </div>
    </>
  );
}

export default ProductBundles;
