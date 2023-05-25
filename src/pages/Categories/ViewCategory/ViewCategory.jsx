import React, { useMemo } from "react";
import styles from "./ViewCategory.module.css";
import { Link, useParams } from "react-router-dom";
import { Breadcrumb } from "antd";
import { CategoryNest, SingleCategory } from "../..";
import {
  useGetCategoryByID,
  useGetNestedCategories,
} from "../../../apis/CategoryApi";
import Spinner from "../../../component/Spinner/Spinner";
const ViewCategory = () => {
  const { id: category_id } = useParams("id");
  const { data, isLoading, isError, error } = useGetCategoryByID(category_id);
  const { data: categoriesData, isLoading: dataLoading } =
    useGetNestedCategories();
  const categories = useMemo(() => {
    return categoriesData?.data?.categories?.storefront_0?.subcategories || [];
  }, [categoriesData]);
  const categoryData = useMemo(() => {
    return data?.data || {};
  }, [data]);
  if (isLoading || dataLoading) {
    return <Spinner />;
  }
  return (
    <div className={styles.view_category}>
      <div className={styles.breadcrumb}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/Categories">Categories</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{category_id}</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className={styles.single_category_main_container}>
        <CategoryNest data={categories} panelKey={category_id} />
        <SingleCategory data={categoryData} />
      </div>
    </div>
  );
};

export default ViewCategory;
