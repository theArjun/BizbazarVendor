import React, { useState } from "react";
import styles from "./SingleProductBundle.module.css";
import cx from "classnames";
import { ProductBundleGeneralTab, ProductBundleProductTab } from "../..";
import { Link, useParams } from "react-router-dom";
import { Card, Button, Breadcrumb } from "antd";
const SingleProductBundle = () => {
  const [activeTab, setActiveTab] = useState("General");
  const [productList, setProductList] = useState([]);
  const { id } = useParams();
  const getDivision = () => {
    switch (activeTab) {
      case "General":
        return <ProductBundleGeneralTab />;
      default:
        return (
          <ProductBundleProductTab
            productList={productList}
            setProductList={setProductList}
          />
        );
    }
  };
  return (
    <div className="product_bundle">
      <div className={styles.breadcrumb}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Marketing</Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="">Edit Product Bundle</a>
          </Breadcrumb.Item>
        </Breadcrumb>
        <Button type="primary" className={styles.create_button}>
          Save changes
        </Button>
      </div>
      <div className={styles.tab_container_card}>
        <div className={styles.product_bundle_top}>
          <div className={styles.tabWrapper}>
            {["General", "Products"].map((dat, i) => (
              <div
                className={cx(
                  styles.tab,
                  dat === activeTab ? styles.bgColor : null
                )}
                key={i}
                onClick={() => setActiveTab(dat)}
              >
                {dat}
              </div>
            ))}
          </div>
        </div>
        <div className={styles.tabcontain}>{getDivision()}</div>
      </div>
    </div>
  );
};

export default SingleProductBundle;
