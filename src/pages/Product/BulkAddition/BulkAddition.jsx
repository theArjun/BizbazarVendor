import React from "react";
import styles from "./BulkAddition.module.css";
import { useSelector } from "react-redux";
import { Breadcrumb, Button, Skeleton } from "antd";
import { useState } from "react";
import { useEffect } from "react";
import { AdditionField, AdditionTable } from "../..";
import { apicall } from "../../../utils/apicall/apicall";
import Spinner from "../../../component/Spinner/Spinner";
const BulkAddition = () => {
  const categories = useSelector((state) => state.product.categories);
  const [products, setProducts] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (products.length) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [products]);

  // api call to insert bulk data
  const insertBulkData = async (bulk_data) => {
    if (bulk_data.length) {
      setLoading(true);
      let finalData = {
        products_data: [...bulk_data],
      };

      let result = await apicall({
        method: "post",
        url: "BulkProducts",
        data: finalData,
      });
      if (result.status == 201) {
        setLoading(false);
        console.log(result);
        setProducts([]);
      }
      setLoading(false);
    }
  };
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
        <Button
          loading={loading}
          disabled={disabled}
          type="primary"
          onClick={() => insertBulkData(products)}
        >
          Create
        </Button>
      </section>
      {categories ? (
        <AdditionField
          categories={categories}
          setProducts={setProducts}
          products={products}
        />
      ) : (
        <Spinner />
      )}
      <div>
        {categories ? (
          <AdditionTable
            products={products}
            setProducts={setProducts}
            categories={categories}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default BulkAddition;
