import React from "react";
import styles from "./BulkAddition.module.css";
import { Breadcrumb, Button, Skeleton } from "antd";
import { useState } from "react";
import { useEffect } from "react";
import { AdditionField, AdditionTable } from "../..";
import Spinner from "../../../component/Spinner/Spinner";
import { useMemo } from "react";
import { useCreateBulkProducts } from "../../../apis/ProductApi";
import { useNavigate } from "react-router-dom";
import { useGetCategories } from "../../../apis/CategoryApi";
const BulkAddition = () => {
  const [products, setProducts] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const navigate = useNavigate();
  const { data: categories, isLoading: categoryLoading } = useGetCategories();
  const { mutate, isLoading: createLoading } = useCreateBulkProducts();
  useEffect(() => {
    if (products.length) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [products]);
  //  for getting order reports
  let getCategories = useMemo(() => {
    if (categories?.data) {
      return categories?.data?.categories;
    }
    return [];
  }, [categories]);
  // api call to insert bulk data
  const insertBulkData = async (bulk_data) => {
    if (bulk_data.length) {
      let finalData = {
        products_data: [...bulk_data],
      };
      mutate(finalData, {
        onSuccess: (res) => {
          navigate("../products");
        },
      });
    }
  };
  if (categoryLoading) {
    return <Spinner />;
  }
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
          loading={createLoading}
          disabled={disabled}
          type="primary"
          onClick={() => insertBulkData(products)}
        >
          Create
        </Button>
      </section>
      <AdditionField
        categories={getCategories}
        setProducts={setProducts}
        products={products}
      />
      <div>
        <AdditionTable
          products={products}
          setProducts={setProducts}
          categories={getCategories}
        />
      </div>
    </div>
  );
};

export default BulkAddition;
