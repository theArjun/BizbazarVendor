import React from "react";
import styles from "./Categories.module.css";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import { CategoryData, CategoryTotalData } from "..";
import { useGetCategories } from "../../apis/CategoryApi";
import { useMemo } from "react";
const Categories = () => {
  const { data, isLoading, error, isError } = useGetCategories();
  function createNestedObject(arr) {
    if (arr.length === 0) {
      return {};
    }

    const nestedObj = {};
    const key = arr[0];
    arr.shift(); // Remove the first element from the array

    nestedObj[key] = createNestedObject(arr);
    return nestedObj;
  }

  const categoryData = useMemo(() => {
    let result = {};
    let temp = data?.data?.categories || [];
    temp.forEach((item, i) => {
      let id_path = String(item.id_path).split("/");
      id_path.pop(-1);
    });
    console.log(result);
  }, [data]);
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
          <CategoryData />
        </div>
        <div className={styles.category_content_right}>
          <CategoryTotalData />
        </div>
      </div>
    </div>
  );
};

export default Categories;
