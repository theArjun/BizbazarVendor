import React from "react";
import styles from "./ProductBundles.module.css";
import { Breadcrumb } from "antd";
import { Button } from "antd";
import { ProductBundleSearch, ProductBundleTable } from "..";
import ProductBundleCreateModal from "../../features/Marketing/ProductBundle/ProductBundleCreateModal/ProductBundleCreateModal";
import { useState } from "react";
import { Link } from "react-router-dom";

function ProductBundles() {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  return (
    <div className={styles.containerWrapper}>
      <div className={styles.breadcrumb}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Marketing</Breadcrumb.Item>
          <Breadcrumb.Item>Product Bundles</Breadcrumb.Item>
        </Breadcrumb>
        <Button
          className={styles.createProductBundle}
          onClick={() => setOpenCreateModal(true)}
        >
          Create Product Bundle
        </Button>
      </div>
      <div className={styles.container}>
        <ProductBundleSearch />
        <ProductBundleTable data={[{ name: "Test product bundle" }]} />
      </div>
      <ProductBundleCreateModal
        openCreateModal={openCreateModal}
        setOpenCreateModal={setOpenCreateModal}
      />
    </div>
  );
}

export default ProductBundles;
