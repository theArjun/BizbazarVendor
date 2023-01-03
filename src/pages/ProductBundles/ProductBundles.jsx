import React from "react";
import styles from "./ProductBundles.module.css";
import { Breadcrumb, Table } from "antd";
import { Input, Button } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import ProductBundleCreateModal from "../../pagecomponents/Marketing/ProductBundle/ProductBundleCreateModal/ProductBundleCreateModal";
import { useState } from "react";

function ProductBundles() {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const data = [
    {
      key: "1",
      name: "Mike",
      age: 2,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 4,
      address: "10 Downing Street",
    },
  ];

  const columns = [
    {
      title: "Bundle name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Products",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Action",
      dataIndex: "address",
      key: "address",
      render: (text, dat) => (
        <div className={styles.icon}>
          <SettingOutlined />
        </div>
      ),
    },
  ];

  return (
    <div className={styles.containerWrapper}>
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
        </div>
        <Table columns={columns} dataSource={data} />
      </div>
      <ProductBundleCreateModal
        openCreateModal={openCreateModal}
        setOpenCreateModal={setOpenCreateModal}
      />
      <Button
        className={styles.createProductBundle}
        onClick={() => setOpenCreateModal(true)}
      >
        Create Product Bundle
      </Button>
    </div>
  );
}

export default ProductBundles;
