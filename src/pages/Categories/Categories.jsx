import React from "react";
import styles from "./Categories.module.css";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import { CategoryData, CategoryTotalData } from "..";
import { useGetNestedCategories } from "../../apis/CategoryApi";
import { useMemo } from "react";
import Spinner from "../../component/Spinner/Spinner";
const Categories = () => {
  const { data, isLoading, error, isError } = useGetNestedCategories();
  const categoryData = useMemo(() => {
    return data?.data?.categories?.storefront_0?.subcategories || [];
  }, [data]);
  const totalData = useMemo(() => {
    return data?.data?.categories_stats || {};
  }, [data]);
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className={styles.categories}>
      <div className={styles.breadcrumb}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Categories</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className={styles.category_content}>
        <div className={styles.category_content_left}>
          <CategoryData data={categoryData} />
        </div>
        <div className={styles.category_content_right}>
          <CategoryTotalData data={totalData} />
        </div>
      </div>
    </div>
  );
};

export default Categories;
