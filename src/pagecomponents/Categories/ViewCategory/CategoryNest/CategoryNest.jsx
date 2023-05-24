import React from "react";
import styles from "./CategoryNest.module.css";
import NestedObjectData from "../../CategoryData/components/NestedObjectData";
const CategoryNest = ({ panelKey }) => {
  const testData = {
    key1: "Value 1",
    key2: {
      nestedKey1: "Nested Value 1",
      nestedKey2: {
        deeplyNestedKey1: "Deeply Nested Value 1",
        deeplyNestedKey2: "Deeply Nested Value 2",
      },
    },
  };
  return (
    <div className={styles.category_nest}>
      <NestedObjectData data={testData} panelKey={panelKey} />
    </div>
  );
};

export default CategoryNest;
