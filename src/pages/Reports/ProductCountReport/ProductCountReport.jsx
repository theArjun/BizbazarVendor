import React from "react";
import styles from "./ProductCountReport.module.css";
import { Breadcrumb } from "antd";
import ProductCountReportComp from "./../../../pagecomponents/Reports/ProductCountReport/ProductCountReport";
import { Link } from "react-router-dom";
function ProductCountReport() {
  return (
    <div className={styles.containerWrapper}>
      <div className={styles.breadcrumb}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Reports</Breadcrumb.Item>
          <Breadcrumb.Item>Product Count Reports</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <ProductCountReportComp />
    </div>
  );
}

export default ProductCountReport;
