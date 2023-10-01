import React, { useState } from "react";
import styles from "./ProductDistributionOnCategory.module.css";
import { Breadcrumb } from "antd";
import { SearchForSalesReport } from "../..";
const INITIAL_PARAMS = {
  period: "C",
  time_from: "",
  time_to: "",
};
const ProductDistributionOnCategory = () => {
  const [params, setParams] = useState(INITIAL_PARAMS);
  return (
    <div className={styles.top_ten_categories_container}>
      <div className="breadcrumb">
        <Breadcrumb>
          <Breadcrumb.Item>Sales</Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="">Products Distribution On Category</a>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <SearchForSalesReport params={params} setParams={setParams} />
      <div>Products distribution on Category content here</div>
    </div>
  );
};

export default ProductDistributionOnCategory;
