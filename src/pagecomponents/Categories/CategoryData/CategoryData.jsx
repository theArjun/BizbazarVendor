import React from "react";
import styles from "./CategoryData.module.css";
import NestedObjectDataWithDetail from "./components/NestedObjectDataWithDetail";
import { GeneralContextProvider } from "../../../ContextProvider/ContextProvider";
const CategoryData = ({ data }) => {
  return (
    <div className={styles.category_data}>
      <div className={styles.category_list_holder}>
        <div
          className={`${styles.category_list_design} ${styles.category_list_heading}`}
        >
          <h3>Categories</h3>
        </div>
        {<NestedObjectDataWithDetail data={data} />}
      </div>
    </div>
  );
};

export default CategoryData;
