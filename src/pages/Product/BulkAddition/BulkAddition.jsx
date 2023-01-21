import React from "react";
import styles from "./BulkAddition.module.css";
import { useSelector } from "react-redux";
import { Breadcrumb, Button, Skeleton } from "antd";
import { useState } from "react";
import { useEffect } from "react";
import { AdditionField, AdditionTable } from "../..";
const BulkAddition = () => {
  const categories = useSelector((state) => state.product.categories);
  const [products, setProducts] = useState([]);
  return (
    <div className={styles.bulk_addition_container}>
      <div className={styles.breadcrumb_container}>
        <Breadcrumb>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="/products/Products">Products</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>BulkProductAddition</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <section className={styles.title_section}>
        <h3>Add products</h3>
        <Button >Create</Button>
      </section>
      {
        categories?<AdditionField categories={categories} setProducts={setProducts} products={products}/>:<Skeleton active />
      }
      <div>
      {
        categories? <AdditionTable products={products} setProducts={setProducts} categories={categories}/>:''
      }
      </div>
     
      </div>
  );
};

export default BulkAddition;
