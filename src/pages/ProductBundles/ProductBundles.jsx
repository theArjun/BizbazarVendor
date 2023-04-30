import React from "react";
import styles from "./ProductBundles.module.css";
import { Breadcrumb, Table } from "antd";
import { Input, Button } from "antd";
import { ProductBundleSearch, ProductBundleTable } from "..";
import ProductBundleCreateModal from "../../pagecomponents/Marketing/ProductBundle/ProductBundleCreateModal/ProductBundleCreateModal";
import { useState } from "react";

function ProductBundles() {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  return (
    <div className={styles.containerWrapper}>
      <div className={styles.breadcumb}>
        <Breadcrumb>
          <Breadcrumb.Item>Marketing</Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="">Product Bundles</a>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className={styles.container}>
        <ProductBundleSearch />
        <ProductBundleTable />
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
