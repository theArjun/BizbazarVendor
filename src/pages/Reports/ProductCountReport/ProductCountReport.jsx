import React from "react";
import styles from "./ProductCountReport.module.css";
import { Breadcrumb } from "antd";
import ProductCountReportComp from "./../../../pagecomponents/Reports/ProductCountReport/ProductCountReport";
import { apicall2 } from "../../../utils/apicall/apicall2";
import { useEffect } from "react";
import { useState } from "react";

function ProductCountReport() {
  return (
    <div className={styles.containerWrapper}>
      <Breadcrumb>
        <Breadcrumb.Item>Reports</Breadcrumb.Item>

        <Breadcrumb.Item>Product Count Reports</Breadcrumb.Item>
      </Breadcrumb>
      <ProductCountReportComp />
    </div>
  );
}

export default ProductCountReport;
