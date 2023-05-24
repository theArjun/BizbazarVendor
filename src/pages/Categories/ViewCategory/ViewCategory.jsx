import React, { useMemo } from "react";
import styles from "./ViewCategory.module.css";
import { Link, useParams } from "react-router-dom";
import { Breadcrumb } from "antd";
import { CategoryNest, SingleCategory } from "../..";
import { useGetCategoryByID } from "../../../apis/CategoryApi";
import Spinner from "../../../component/Spinner/Spinner";
const ViewCategory = () => {
  const { id: category_id } = useParams("id");
  const { data, isLoading, isError, error } = useGetCategoryByID(category_id);

  const categoryData = useMemo(() => {
    return data?.data || {};
  }, [data]);
  if (isLoading) {
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
        <CategoryNest panelKey={category_id} />
        <SingleCategory data={categoryData} />
      </div>
    </div>
  );
};

export default ViewCategory;
